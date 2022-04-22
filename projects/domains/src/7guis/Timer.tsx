import { merge, animationFrames, of, NEVER } from 'rxjs'

import { distinctUntilChanged, map, mapTo, pairwise, switchMap, takeUntil } from 'rxjs/operators'

import { Remesh } from 'remesh'

export const Timer = Remesh.domain({
  name: 'timer',
  inspectable: false,
  impl: (domain) => {
    const DurationState = domain.state({
      name: 'duration',
      default: 15000,
    })

    const ElapsedState = domain.state({
      name: 'elapsed',
      default: 0,
    })

    const StartEvent = domain.event({
      name: 'StartEvent',
    })

    const StopEvent = domain.event({
      name: 'StopEvent',
    })

    const updateElapsed = domain.command({
      name: 'updateElapsed',
      impl: ({ get }, increment: number) => {
        const duration = get(DurationState())
        const elapsed = get(ElapsedState())

        if (elapsed > duration) {
          return StopEvent()
        }

        return ElapsedState().new(elapsed + increment)
      },
    })

    const updateDuration = domain.command({
      name: 'updateDuration',
      impl: ({ get }, newDuration: number) => {
        const elapsed = get(ElapsedState())

        if (newDuration > elapsed) {
          return [DurationState().new(newDuration), StartEvent()]
        }

        return DurationState().new(newDuration)
      },
    })

    const resetElapsed = domain.command({
      name: 'resetElapsed',
      impl: ({}) => {
        return [ElapsedState().new(0), StartEvent()]
      },
    })

    domain.command$({
      name: 'updateElapsed$',
      impl: ({ fromEvent }) => {
        const event$ = merge(fromEvent(StartEvent).pipe(mapTo(1)), fromEvent(StopEvent).pipe(mapTo(0))).pipe(
          distinctUntilChanged(),
        )

        const main$ = event$.pipe(
          switchMap((signal) => {
            if (signal === 0) {
              return NEVER
            }
            return animationFrames().pipe(
              pairwise(),
              map(([a, b]) => b.elapsed - a.elapsed),
              map((increment) => updateElapsed(increment)),
              takeUntil(fromEvent(StopEvent)),
            )
          }),
        )

        return merge(main$, of(StartEvent()))
      },
    })

    return {
      query: {
        duration: DurationState.query,
        elapsed: ElapsedState.query,
      },
      command: {
        resetElapsed,
        updateDuration,
      },
    }
  },
})