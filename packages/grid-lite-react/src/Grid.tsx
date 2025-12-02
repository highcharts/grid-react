import React from 'react';
import {
    BaseGrid,
    GridProps
} from '@highcharts/grid-shared-react';
import Grid from '@highcharts/grid-lite';
import '@highcharts/grid-lite/css/grid-lite.css';

export type Options = Grid.Options;

export default function GridLite(props: GridProps<Options>) {
    return <BaseGrid options={props.options} Grid={Grid} />;
}
