import {
    BaseGrid,
    GridProps
} from '@highcharts/grid-shared-react';
import Grid from '@highcharts/grid-pro/es-modules/masters/grid-pro.src';
import '@highcharts/grid-pro/css/grid-pro.css';
import type { Options } from '@highcharts/grid-pro/es-modules/Grid/Core/Options';

export default function GridPro(props: GridProps<Options>) {
    return <BaseGrid options={props.options} Grid={Grid} />;
}
