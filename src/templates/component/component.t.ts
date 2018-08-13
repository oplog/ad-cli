export interface ComponentTemplateParams {
  componentName: string;
}

export function generateComponent(params: ComponentTemplateParams): string {
  return (
    `
import * as React from 'react';

export interface ${params.componentName}Props {
}

export interface ${params.componentName}State {
}

export class ${params.componentName} extends React.Component<${params.componentName}Props, ${params.componentName}State> {
  constructor(props: ${params.componentName}Props) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <div />
    );
  }
}
`);
}

export function generateComponentTest(params: ComponentTemplateParams): string {
  return (
`
describe("Component -> ${params.componentName}", () => {
    it("should render", () => {
        expect(false).toBeTruthy();
    });
});
`
  );
}
