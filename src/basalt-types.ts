type Nucleus = "circ" | "triang";

type LegIndex = 1 | 2 | 3 | 4 | 5 | 6;

export type BasaltCharacter = {
    nucleus: Nucleus;
    // legs can be one of six, numbered as so (N is the nucleus):
    /*
     *                    /\
     *                   /  \
     *                  /____\
     *                 /\    /\
     *                /  \ 2/  \ 
     *               /____\/____\
     *              /\ 1  /\  3 /\
     *             /  \  / N\  /  \
     *            /____\/____\/____\
     *           /\  6 /\  5 /\  4 /\
     *          /  \  /  \  /  \  /  \
     *         /____\/____\/____\/____\
     *            
     */
    legs: LegIndex[];
    isEndOfWord?: boolean;
    hasAccent?: boolean;
}

export const BASALT_CHAR_PER_UNICODE_CHAR: Record<string, BasaltCharacter> = {
    "A": {
        nucleus: "triang",
        legs: [1]
    },
    "B": {
        nucleus: "triang",
        legs: [5, 6]
    },
    "C": {
        nucleus: "triang",
        legs: [3, 5]
    },
    "D": {
        nucleus: "circ",
        legs: [3, 4]
    },
    "E": {
        nucleus: "circ",
        legs: [3]
    },
    "F": {
        nucleus: "triang",
        legs: [2, 3]
    },
    "G": {
        nucleus: "circ",
        legs: [1, 6]
    },
    "H": {
        nucleus: "triang",
        legs: [3, 6]
    },
    "I": {
        nucleus: "circ",
        legs: [1, 5]
    },
    "J": {
        nucleus: "circ",
        legs: [3, 5]
    },
    "K": {
        nucleus: "triang",
        legs: [4, 5]
    },
    "L": {
        nucleus: "triang",
        legs: [3, 4]
    },
    "M": {
        nucleus: "circ",
        legs: [1, 3]
    },
    "N": {
        nucleus: "triang",
        legs: [1, 3]
    },
    "Ñ": {
        nucleus: "triang",
        legs: [3, 6]
    },
    "O": {
        nucleus: "circ",
        legs: [1]
    },
    "P": {
        nucleus: "circ",
        legs: [3, 6]
    },
    "Q": {
        nucleus: "circ",
        legs: [1, 4]
    },
    "R": {
        nucleus: "triang",
        legs: [1, 4]
    },
    "S": {
        nucleus: "triang",
        legs: [1, 2]
    },
    "T": {
        nucleus: "circ",
        legs: [2, 3]
    },
    "U": {
        nucleus: "circ",
        legs: [3]
    },
    "V": {
        nucleus: "circ",
        legs: [1, 2]
    },
    "W": {
        nucleus: "triang",
        legs: [1, 5]
    },
    "X": {
        nucleus: "circ",
        legs: [4, 5]
    },
    "Y": {
        nucleus: "circ",
        legs: [2, 5]
    },
    "Z": {
        nucleus: "circ",
        legs: [5, 6]
    },
    ",": {
        nucleus: "triang",
        legs: [2]
    },
    ".": {
        nucleus: "circ",
        legs: [2]
    }
    ,
    "¡": {
        nucleus: "triang",
        legs: [4]
    },
    "!": {
        nucleus: "triang",
        legs: [6]
    },
    "¿": {
        nucleus: "circ",
        legs: [4]
    },
    "?": {
        nucleus: "circ",
        legs: [6]
    }
};

