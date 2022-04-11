import { State } from "react-native-gesture-handler";
import Animated, { add, block, call, Clock, cond, eq, set, spring, startClock, stopClock, useValue } from "react-native-reanimated"
import { snapPoint, useClock } from "react-native-redash";

interface useSpringParams{
    value: Animated.Node<Number>;
    velocity: Animated.Node<Number>;
    state: Animated.Node<State>;
    snapPoints: number[];
    onSnap: (value: readonly number[]) => void
}

export const useSpring = ({
    value,
    velocity, 
    state: gestureState,
    snapPoints, 
    onSnap
}: useSpringParams) => {
    const offSet = useValue(0) 
    const clock = useClock()
    const state = {
        position: useValue(0),
        finished: useValue(0),
        time: useValue(0),
        velocity: useValue(0)
    };
    const config = {
        toValue: useValue(0),
        damping: 6,
        mass: 1,
        stiffness: 64,
        overshootClamping: useValue(0),
        resSpeedThreshold:  useValue(0.1),
        restDisplacementThreshold:  useValue(0.1),
    }

    return block([
        cond(eq(gestureState, State.BEGAN), [
            set(offSet, state.position),
            stopClock(clock),
            set(state.finished,0),
            set(state.time, 0)
        ]),
        cond(eq(gestureState, State.ACTIVE), [//@ts-ignore
            set(state.position, add(offSet, value)),//@ts-ignore
            set(state.velocity, velocity),
            set(
                config.toValue, 
                
                snapPoint(state.position,state.velocity,snapPoints)
            )
        ]),
        cond(eq(gestureState, State.END), [
            startClock(clock), //@ts-ignore
            spring(clock,state,config),
            cond(state.finished, [
                onSnap && call([state.position], onSnap)
            ])
        ]),
        state.position,
    ])
}