export const initialColumns = {
    Attributes: {
      id: 'Attributes',
      list: [
        'Tenures',
        'Locations', 
        'Manager Levels', 
        'Region', 
        'Generation', 
        'Squad', 
        'Role'],
    },
    OrgTree: {
      id: 'OrgTree',
      list: [],
    },
  }

  /*
      Attribute: {
      id: 'Attribute',
      list: [
        {
          colName: 'Tenures', 
          colData: tenures
        },
        'Locations', 
        'Manager Levels', 
        'Region', 
        'Generation', 
        'Squad', 
        'Role'],
    },
    OrgTree: {
      id: 'OrgTree',
      list: [],
    },
  */

  const tenures = [
    {
      name: '1 - 2 years'
    },
    {
      name: '3 - 5 years'
    },
    {
      name: '6 - 9 years'
    },
    {
      name: 'Less than 1 year'
    }
  ]

  const locations = [
    {
      name: 'Boston',
      data: ['Executive', 'Finance', 'HR', 'Information Technology', 'Operations', 'Sales']
    },
    {
      name: 'Dallas',
      data: ['Executive', 'Information Technology', 'Operations', 'Sales']
    },
    {
      name: 'Des Moines',
      data: ['Executive', 'Sales']
    },
    {
      name: 'San Diego',
      data: ['Operations', 'Sales']
    },
    {
      name: 'San Franciso',
      data: ['Information Technology', 'Operations', 'Sales']
    },
  ]