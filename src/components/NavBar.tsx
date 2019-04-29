"use strict";

import { Component, ComponentChild, RenderableProps, h } from "preact";
import Bulma, { Navbar } from "react-bulma-components";

export class NavBar extends Component<NavBar.Properties, NavBar.States> {

    constructor(props?: NavBar.Properties, context?: any) {

        super(props, context);
    }

    public render(props?: RenderableProps<NavBar.Properties>, state?: Readonly<NavBar.States>, context?: any): ComponentChild {

        // const {  } = props;
        return (
            <Navbar></Navbar>
        );
    }
}

export namespace NavBar {

    export type Properties = BaseProperties;

    export interface States {}

    interface BaseProperties {}
    type IncludedAttributes = "id";
}
