import {
  useState,
  // useRef
} from 'react';
import {
  type GridInstance,
  // type GridRefHandle,
  type GridOptions,
  Grid,
  Caption,
  Data,
  // DataTable,
  ColumnDefaults,
  Column,
  Description,
  Pagination,
  Header
} from '@highcharts/grid-lite-react';

function App() {
  // const grid = useRef<GridRefHandle<GridOptions> | null>(null);

  // ==== OPTIONS ====
  // const [options] = useState<GridOptions>({
  //   dataTable: {
  //     columns: {
  //       name: ['1111Alice', 'Bob', 'Charlie', 'David', 'Eve'],
  //       age: [23, 34, 45, 56, 67],
  //       city: ['New York', 'Oslo', 'Paris', 'Tokyo', 'London'],
  //       salary: [50000, 60000, 70000, 80000, 90000]
  //     }
  //   }
  // });

  // ==== DATA ====
  // Data Columns
  const [dataSource] = useState({
    name: [
      'Alice Nguyen', 'Bob Berg', 'Charlie Dupont', 'David Sato', 'Eve Shaw',
      'John Hale', 'Jane Ortiz', 'Jim Novak', 'Jill Meyer', 'Jack Quinn',
      'Nora Ellis', 'Omar Khan', 'Priya Shah', 'Quinn Blake', 'Ruth Adler',
      'Sam Okonkwo', 'Tina Rossi', 'Uma Patel', 'Victor Lang', 'Wendy Cho'
    ],
    age: [
      23, 34, 45, 56, 67, 30, 25, 35, 40, 45,
      28, 31, 39, 42, 51, 27, 33, 36, 44, 48
    ],
    city: [
      'New York', 'Oslo', 'Paris', 'Tokyo', 'London',
      'New York', 'Oslo', 'Paris', 'Tokyo', 'London',
      'Berlin', 'Toronto', 'Mumbai', 'Sydney', 'Zurich',
      'Lagos', 'Rome', 'Lisbon', 'Seoul', 'Chicago'
    ],
    salary: [
      50000, 60000, 70000, 80000, 90000,
      40000, 35000, 45000, 50000, 55000,
      62000, 71000, 48000, 53000, 88000,
      41000, 59000, 64000, 76000, 82000
    ]
  });

  // Data Table
  // const dataTable = new DataTable({
  //   columns: {
  //     name: ['DATATABLE', 'Bob', 'Charlie', 'David', 'Eve'],
  //     age: [23, 34, 45, 56, 67],
  //     city: ['New York', 'Oslo', 'Paris', 'Tokyo', 'London'],
  //     salary: [50000, 60000, 70000, 80000, 90000]
  //   }
  // });

  // ==== ACTIONS ====
  // const onButtonClick = () => {
  //   // console.info('(ref) grid:', grid.current?.grid);
  //   setDataSource({
  //     name: ['John', 'Jane', 'Jim', 'Jill', 'Jack'],
  //     age: [30, 25, 35, 40, 45],
  //     city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'],
  //     salary: [40000, 35000, 45000, 50000, 55000]
  //   });
  // };

  const onGridCallback = (grid: GridInstance<GridOptions>) => {
    console.info('(callback) grid:', grid);
  };

  // Pagination
  // const [paginationEnabled, setPaginationEnabled] = useState(false);

  // const onPaginationClick = () => {
  //   setPaginationEnabled(true);
  // };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl p-4 sm:p-8">
        <Grid
          // options={options}
          // gridRef={grid}
          theme=""
          callback={onGridCallback}
          className="demo-grid rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
          tableClassName="w-full border border-slate-200 rounded-md dark:border-slate-700"
        >
          <Data
            // dataTable={dataTable}
            columns={dataSource}
          />
          <ColumnDefaults
            dataType="string"
            width="auto"
            exportable
            sortingEnabled
            sortingOrderSequence={['asc', 'desc', null]}
            filteringEnabled
            // filteringInline={true}
            // filteringCondition="contains"
            // filteringValue=""
            headerFormat="{id}"
            headerClassName="p-4 border-b border-r border-slate-200 font-semibold bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            cellClassName="p-4 border-b border-r border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
            rowClassName="hover:bg-slate-50 dark:hover:bg-slate-800/80"
            evenRowClassName="bg-slate-50/50 dark:bg-slate-800/40"
            cellFormat="{value}"
            cellRowHeader={false}
          />
          <Caption
            className="mb-2 pt-2 pb-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100"
          >Team directory</Caption>
          <Header header={[
            'name',
            {
              format: 'Details',
              className: 'hcg-center',
              columns: ['age', 'city', 'salary']
            }
          ]} />
          <Column
            headerFormat="#"
            width={40}
            cellValueGetter={function (this: { row: { index: number } }) {
              return String(this.row.index + 1);
            }}
          />
          <Column
            columnId="name"
            enabled
            sortingEnabled
            sortingOrder="asc"
            sortingPriority={0}
            // filteringEnabled
            // filteringInline
            // filteringCondition="contains"
            headerFormat="Name"
            cellClassName="font-semibold text-slate-900 dark:text-slate-100"
            cellFormat="{value}"
          />
          <Column
            columnId="age"
            dataType="number"
            headerFormat="Age ({id})"
            cellFormat="{value}"
          />
          <Column
            columnId="city"
            width="20%"
            headerFormatter={function () {
              return `City: ${(this as { id?: string }).id ?? ''}`;
            }}
          />
          <Column
            columnId="salary"
            dataType="number"
            headerFormat="Salary (USD)"
            headerClassName="text-right tabular-nums"
            cellClassName="text-right tabular-nums"
            cellFormat="${value}"
          />
          <Description
            className="mb-2 pt-1 pb-4 text-sm text-slate-500 dark:text-slate-400"
          >
            Filter, sort, and page through sample employee rows styled with
            utility classes.
          </Description>
          <Pagination
            // enabled={paginationEnabled}
            page={1}
            pageSize={5}
            // align="right"
            className="mt-2 pt-2 pb-1"
            infoClassName="font-semibold text-sm text-slate-700 dark:text-slate-200"
            controlsClassName="gap-2"
            sizeClassName="demo-pag-size gap-2 font-semibold text-sm text-slate-700 dark:text-slate-200"
            // pageInfo
            // pageSizeSelector
            pageSizeOptions={[5, 10, 25]}
            // pageButtons
            pageButtonsCount={5}
            // firstLast
            // previousNext
            // className="mt-4"
          />
        </Grid>
        {/* <div id="controls" className="mt-4">
          <button onClick={onButtonClick}>Data state</button>
          <button onClick={onPaginationClick}>Pagination</button>
        </div> */}
      </div>
    </div>
  );
}

export default App;
