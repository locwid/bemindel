import z from 'zod'

const zRuntimeConfigState = z.object({
  postgresUrl: z.string(),
})

type ZRuntimeConfigState = z.infer<typeof zRuntimeConfigState>

const file = Bun.file('rc.json')

class RuntimeConfig {
  private _state: ZRuntimeConfigState | null = null

  private set state(state: ZRuntimeConfigState) {
    this._state = structuredClone(state)
  }

  get state(): ZRuntimeConfigState {
    if (!this._state) {
      throw new Error('Runtime config is not initialized')
    }
    return structuredClone(this._state)
  }

  get isDefined() {
    return this._state !== null
  }

  async initialize() {
    const exists = await file.exists()
    if (!exists) {
      return null
    }

    const json = await file.json()
    const parsed = zRuntimeConfigState.safeParse(json)
    if (!parsed.success) {
      throw new Error(`Invalid runtime config: ${parsed.error.message}`)
    }
    this.state = parsed.data
    return this.state
  }

  async set(newState: ZRuntimeConfigState) {
    await Bun.write(file, JSON.stringify(newState))
    this.state = newState
    return this.state
  }
}

export const runtimeConfig = new RuntimeConfig()
