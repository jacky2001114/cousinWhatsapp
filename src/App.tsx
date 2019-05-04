"use strict";

import { Component, ComponentChild, RenderableProps } from "preact";

import { JSXInputAttributes } from "./types/Attributes";
import { Omit } from "./types/Helpers";
import { MigrateProperties } from "./types/Preact";

export class App extends Component<App.Properties, App.States> {

    constructor(props?: App.Properties, context?: any) {

        super(props, context);
    }

    public render(props?: RenderableProps<App.Properties>, state?: Readonly<App.States>, context?: any): ComponentChild {

        // const {  } = props;
        return null;
    }
}

export namespace App {

    export type Properties = BaseProperties;

    export interface States {}

    interface BaseProperties {}
    type IncludedAttributes = "id";
}
