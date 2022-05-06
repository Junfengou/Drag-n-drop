export const treeData = {
  name: 'root',
  toggled: true,
  children: [
      {
          name: 'Divisions',
          children: [
              { name: 'Division 1' },
              { name: 'Division 2' }
          ]
      },
      {
        name: 'Departments',
        children: [
            { name: 'Product' },
            { name: 'Executive' },
            { name: 'Marketing' },
            { name: 'Sales' },
            { name: 'Customer Service' },
            { name: 'Maintenance' },
            { name: 'Employee Success' }
        ]
      },
      {
          name: 'Locations',
          children: [
              {
                  name: 'nested parent',
                  children: [
                      { name: 'nested child 1' },
                      { name: 'nested child 2' }
                  ]
              }
          ]
      },
      {
        name: 'loading parent',
        loading: true,
        children: []
    },
  ]
};