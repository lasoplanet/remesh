import { Remesh, RemeshDomainContext, Capitalize } from '../index'

export type TextModuleOptions = {
  name: Capitalize
  default?: string
}

export const TextModule = (domain: RemeshDomainContext, options: TextModuleOptions) => {
  const TextState = domain.state({
    name: `${options.name}.TextState`,
    default: options.default ?? '',
  })

  const TextQuery = domain.query({
    name: `${options.name}.TextQuery`,
    impl: ({ get }) => get(TextState()),
  })

  const SetTextCommand = domain.command({
    name: `${options.name}.SetTextCommand`,
    impl: ({ set }, current: string) => {
      set(TextState(), current)
    },
  })

  const ClearTextCommand = domain.command({
    name: `${options.name}.ClearTextCommand`,
    impl: ({ set }) => {
      set(TextState(), '')
    },
  })

  const ResetCommand = domain.command({
    name: `${options.name}.ResetCommand`,
    impl: ({ set }) => {
      set(TextState(), options.default ?? '')
    },
  })

  return Remesh.module({
    query: {
      TextQuery,
    },
    command: {
      SetTextCommand,
      ClearTextCommand,
      ResetCommand,
    },
  })
}
