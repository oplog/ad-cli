import { capitalize } from "../string.utils";
export interface ContainerTemplateParams {
    containerName: string;
}

export function generateContainer(params: ContainerTemplateParams): string {
    return (
        `
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StoreState } from "@store";

function mapStateToProps(state: StoreState): Partial<${capitalize(params.containerName)}Props> {
    return {
        // TODO: map your props to state here
    };
}

function mapDispatchToProps(
    dispatch: Dispatch<any>, // TODO: Convert any to action
): Partial<${capitalize(params.containerName)}Props> {
    return {
        // TODO: Map your dispatch to props here
    };
}

export const ${capitalize(params.containerName)}Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(${capitalize(params.containerName)});
`);
}
