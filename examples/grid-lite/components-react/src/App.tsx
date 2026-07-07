import { useState, useRef } from 'react';
import {
  type GridInstance,
  type GridRefHandle,
  type GridOptions,
  Grid,
  Caption,
  Data,
  DataTable,
  ColumnDefaults,
  Column,
  Description,
  Pagination,
  Header
} from '@highcharts/grid-lite-react';

function App() {
  const grid = useRef<GridRefHandle<GridOptions> | null>(null);

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
  const [dataSource, setDataSource] = useState({
    name: ['COLUMNS', 'Bob', 'Charlie', 'David', 'Eve'],
    age: [23, 34, 45, 56, 67],
    city: ['New York', 'Oslo', 'Paris', 'Tokyo', 'London'],
    salary: [50000, 60000, 70000, 80000, 90000]
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
  const onButtonClick = () => {
    // console.info('(ref) grid:', grid.current?.grid);
    setDataSource({
      name: ['John', 'Jane', 'Jim', 'Jill', 'Jack'],
      age: [30, 25, 35, 40, 45],
      city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'],
      salary: [40000, 35000, 45000, 50000, 55000]
    });
  };

  const onGridCallback = (grid: GridInstance<GridOptions>) => {
    console.info('(callback) grid:', grid);
  };

  // Pagination
  // const [paginationEnabled, setPaginationEnabled] = useState(false);

  // const onPaginationClick = () => {
  //   setPaginationEnabled(true);
  // };

  return (
      <div className="p-4">
        <Grid
          // options={options}
          // gridRef={grid}
          theme="myTheme m-8"
          callback={onGridCallback}
          className="border border-slate-300 rounded-md bg-slate-100"
        >
          <Data
            // dataTable={dataTable}
            columns={dataSource}
          />
          <ColumnDefaults
            dataType="string"
            width="auto"
            exportable
            style={{ fontWeight: '400' }}
            sortingEnabled
            sortingOrderSequence={['asc', 'desc', null]}
            filteringEnabled
            filteringInline={true}
            filteringCondition="contains"
            filteringValue=""
            // headerClassName="demo-header-cell"
            headerFormat="{id}"
            // cellClassName="demo-body-cell"
            cellFormat="{value}"
            cellRowHeader={false}
          />
          <Caption
            className="text-lg font-bold"
          >Grid Caption v2.1</Caption>
          <Header header={[
            'name',
            {
              format: 'Details',
              columns: ['age', 'city', 'salary']
            }
          ]} />
          <Column
            // className="demo-index-column"
            // headerClassName="demo-index-header"
            // cellClassName="demo-index-cell"
            headerFormat="#"
            width={40}
            cellValueGetter={function (this: { row: { index: number } }) {
              return String(this.row.index + 1);
            }}
          />
          <Column
            columnId="name"
            // className="hcg-name-column"
            enabled
            sortingEnabled
            sortingOrder="asc"
            sortingPriority={0}
            // filteringEnabled
            // filteringInline
            // filteringCondition="contains"
            // headerClassName="demo-name-header"
            headerFormat="Name"
            // cellClassName="demo-name-cell"
            cellFormat="{value}"
          />
          <Column
            columnId="age"
              // className="demo-age-column"
              // headerClassName="demo-age-header"
              // cellClassName="demo-age-cell"
            dataType="number"
            headerFormat="Age ({id})"
            cellFormat="{value}"
          />
          <Column
            columnId="city"
              // className="demo-city-column"
              // headerClassName="demo-city-header"
              // cellClassName="demo-city-cell"
            width="20%"
            headerFormatter={function () {
              return `City: ${(this as { id?: string }).id ?? ''}`;
            }}
          />
          <Column
            columnId="salary"
              // className="demo-salary-column"
              // headerClassName="demo-salary-header"
              // cellClassName="demo-salary-cell"
            dataType="number"
            headerFormat="Salary (USD)"
            cellFormat="${value}"
          />
          <Description
            // className="demo-description"
          >Grid Description</Description>
          <Pagination
            // enabled={paginationEnabled}
            page={1}
            pageSize={3}
            align="right"
            // pageInfo
            // pageSizeSelector
            pageSizeOptions={[3, 5, 10, 25]}
            // pageButtons
            pageButtonsCount={5}
            // firstLast
            // previousNext
          />
        </Grid>
        <div className="mt-4">
          <button onClick={onButtonClick}>Data state</button>
          {/* <button onClick={onPaginationClick}>Pagination</button> */}
        </div>
      </div>
  );
}

export default App;
