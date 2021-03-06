import xstate from 'c/libXState';

export const defaultVals = {
    segment_dur_days: 14,
    total_segments: 6,
    segment_index: 1,
    num_segments: 2,
};
const { createMachine, assign } = xstate;

export const compMachine = createMachine(
    {
        id: 'slideDateGridMachine',
        initial: 'loading',
        context: defaultVals,
        states: {
            loading: {
                on: {
                    complete: 'ready',
                },
            },
            ready: {},
        },
        on: {
            RIGHT: [
                { actions: 'shiftRight', cond: 'isShiftClick' },
                { actions: 'right' },
            ],
            LEFT: [
                { actions: 'shiftLeft', cond: 'isShiftClick' },
                { actions: 'left' },
            ],
        },
    },
    {
        actions: {
            right: assign({
                segment_index: (context) => {
                    const { segment_index, total_segments } = context;
                    return segment_index + 1 < total_segments
                        ? segment_index + 1
                        : segment_index;
                },
            }),
            shiftRight: assign({
                num_segments: (context) => {
                    const { segment_index, total_segments, num_segments } =
                        context;
                    return segment_index + num_segments < total_segments
                        ? num_segments + 1
                        : num_segments;
                },
            }),
            left: assign({
                segment_index: (context) => {
                    return context.segment_index > 0
                        ? context.segment_index - 1
                        : context.segment_index;
                },
            }),
            shiftLeft: assign({
                num_segments: (context) => {
                    return context.num_segments > 1
                        ? context.num_segments - 1
                        : context.num_segments;
                },
            }),
        },
        guards: {
            isShiftClick: (_, event) => event.shiftKey,
        },
    },
);
