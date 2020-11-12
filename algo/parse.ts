import { assert } from "console";

const str = "1 + (2 * 5 - 3) + 1";

assert(false);

enum Operation {
    NOP,
    ADD,
    SUB,
    MUL,
    DIV,
    MOD
}

class Expression {
    value: number = 0;
    operation: Operation = Operation.NOP;
    pLeft: Expression = null;
    pRight: Expression = null;
}

const CalculateExpression = (node: Expression) => {

    if (node.operation == Operation.NOP) {
        return node.value;
    }

    CalculateExpression(node.pLeft);
    CalculateExpression(node.pRight);

    switch(node.operation) {
        case Operation.ADD:
            node.value = node.pLeft.value + node.pRight.value;
            break;
        case Operation.SUB:
            node.value = node.pLeft.value + node.pRight.value;
            break;
        case Operation.MUL:
            node.value = node.pLeft.value + node.pRight.value;
            break;
        case Operation.DIV:
            node.value = node.pLeft.value + node.pRight.value;
            break;
        case Operation.MOD:

            break;
    }

}