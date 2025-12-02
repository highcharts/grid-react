import React from 'react';
import {
    BaseGrid,
    GridProps
} from '@highcharts/grid-shared-react';
import Grid from '@highcharts/grid-pro';
import '@highcharts/grid-pro/css/grid-pro.css';

export type Options = Grid.Options;

export default function GridPro(props: GridProps<Options>) {
    return <BaseGrid options={props.options} Grid={Grid} />;
}
