import {
    BaseGrid,
    GridProps
} from '@highcharts/grid-shared-react';
import Grid from '@highcharts/grid-lite/es-modules/masters/grid-lite.src';
import '@highcharts/grid-lite/css/grid-lite.css';
import type { Options } from '@highcharts/grid-lite/es-modules/Grid/Core/Options';

export default function GridLite(props: GridProps<Options>) {
    return <BaseGrid options={props.options} Grid={Grid} />;
}
