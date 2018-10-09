import { capitalize } from "../string.utils";
export interface ContainerTemplateParams {
    containerName: string;
}

export function generateContainer(params: ContainerTemplateParams): string {
    return (
        `
import { ${capitalize(params.containerName)}, ${capitalize(params.containerName)}Props } from "@components";
import { StoreState } from "@store";
import { connect } from "react-redux";
import { Dispatch } from "redux";

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

export function generateContainerTest(params: ContainerTemplateParams): string {
    return (
        `
import { ${capitalize(params.containerName)}Container } from "@containers/${capitalize(params.containerName)}Container";
import * as React from "react";
import { createMockStore, shallowWithStore } from "../utils";

describe("Container -> ${capitalize(params.containerName)}Container", () => {

  const store = createMockStore({});

  it("should render", () => {
    const wrapper = shallowWithStore(<${capitalize(params.containerName)}Container />, store);
    expect(wrapper).toHaveLength(1);
  });

});
`
    );
}
