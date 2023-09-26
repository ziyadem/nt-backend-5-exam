import type { User } from '@prisma/client'
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '@prisma'
import { sign, refreshSign } from '@helpers'
import type {
  SignInRequest,
  SignOutRequest,
  SignUpRequest,
  SignUpResponse,
  UserDeleteRequest,
  RestoreRequest,
  RestoreResponse,
} from './interfaces'

@Injectable()
export class AuthService {
  readonly #_prisma: PrismaService

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma
  }

  //sign-Up
  async signUp(payload: SignUpRequest): Promise<SignUpResponse> {
    const del = await this.#_restoreUserDeletedAt({
      user_tel: payload.user_tel,
      password: payload.password,
    })
    if (del) {
      if (del.deletedAt) {
        throw new ConflictException(
          'The user is pre-existing. You can restore(true/false) the account',
        )
      }
    }
    await this.#_checkExistingUser({ user_tel: payload.user_tel })
    const newUser = await this.#_prisma.user.create({
      data: {
        user_tel: payload.user_tel,
        password: payload.password,
      },
      select: {
        id: true,
      },
    })
    const rt = refreshSign({ id: newUser.id })
    const at = sign({ id: newUser.id })
    await this.#_prisma.user.update({
      data: {
        refreshToken: rt,
      },
      where: {
        id: newUser.id,
      },
    })
    return {
      accessToken: at,
      refreshToken: rt,
    }
  }

  // sign-In
  async signIn(payload: SignInRequest): Promise<SignUpResponse> {
    const user = await this.#_checkUser({
      user_tel: payload.user_tel,
      password: payload.password,
    })
    return {
      accessToken: sign({ id: user.id }),
      refreshToken: refreshSign({ id: user.id }),
    }
  }

  // sign-Out
  async signOut(payload: SignOutRequest): Promise<null> {
    const foundedUser = await this.#_prisma.user.findFirst({
      where: {
        refreshToken: payload.refreshToken,
      },
      select: {
        id: true,
      },
    })
    if (!foundedUser) {
      throw new NotFoundException('Refresh token not found')
    }
    await this.#_prisma.user.updateMany({
      where: {
        id: foundedUser.id,
        refreshToken: payload.refreshToken,
      },
      data: {
        refreshToken: null,
      },
    })
    return null
  }

  //restore
  async restore(payload: RestoreRequest): Promise<RestoreResponse> {
    const del = await this.#_restoreUserDeletedAt({
      user_tel: payload.user_tel,
      password: payload.password,
    })
    if (del.deletedAt) {
      if (payload.restore) {
        const rt = await refreshSign({ id: del.id })
        const at = await sign({ id: del.id })
        await this.#_prisma.user.updateMany({
          where: {
            user_tel: payload.user_tel,
            password: payload.password,
          },
          data: {
            deletedAt: null,
            refreshToken: rt,
          },
        })
        return {
          accessToken: at,
          refreshToken: rt,
        }
      } else {
        await this.#_checkExistingUser({ user_tel: payload.user_tel })
        const newUser = await this.#_prisma.user.create({
          data: {
            user_tel: payload.user_tel,
            password: payload.password,
          },
          select: {
            id: true,
          },
        })
        const rt = refreshSign({ id: newUser.id })
        const at = sign({ id: newUser.id })
        await this.#_prisma.user.update({
          data: {
            refreshToken: rt,
          },
          where: {
            id: newUser.id,
          },
        })
        return {
          accessToken: at,
          refreshToken: rt,
        }
      }
    }
  }

  // user-delete
  async delete(payload: UserDeleteRequest): Promise<null> {
    const date = new Date()
    const user = await this.#_prisma.user.findFirst({
      where: {
        id: payload.user_id,
      },
      select: {
        id: true,
      },
    })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    await this.#_prisma.user.update({
      where: {
        id: payload.user_id,
      },
      data: {
        deletedAt: date,
        refreshToken: null,
      },
    })
    return null
  }

  async #_checkUser(payload: {
    user_tel: string
    password?: string
  }): Promise<Pick<User, 'id'>> {
    const user = await this.#_prisma.user.findFirst({
      where: {
        user_tel: payload.user_tel,
        password: payload.password,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return {
      id: user.id,
    }
  }

  async #_restoreUserDeletedAt(payload: {
    user_tel: string
    password: string
  }) {
    const del = await this.#_prisma.user.findFirst({
      where: {
        user_tel: payload.user_tel,
        password: payload.password,
      },
      select: {
        deletedAt: true,
        id: true,
      },
    })
    return del
  }

  async #_checkExistingUser(payload: { user_tel: string }): Promise<void> {
    const user = await this.#_prisma.user.findFirst({
      where: {
        user_tel: payload.user_tel,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    })
    if (user) {
      throw new ConflictException('User already exists')
    }
  }
}
