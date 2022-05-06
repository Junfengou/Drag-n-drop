const divisions = {
    name: 'Divisions',
    data: ['Division 1', 'Division 2'],
    branch: null
}

const locations = {
  name: 'Locations',
  data: ['Omaha', 'Boston', 'Chicago', 'Des Moines'],
  branch: null
}

const departments = {
  name: 'Departments',
  data: ['Product', 'Executive', 'Marketing', 'Sales', 'Customer Service', 'Maintenance', 'Employee Success'],
  branch: null
}

const roles = {
  name: 'Roles',
  data: ['Devs', 'Data Scientists', 'SDR', 'Graphic Designer', 'Product Designer', 'CSM', 'Janitor', 'Recruiter', 'ES Generalist', 'CEO', 'CFO'],
  branch: null
}



export const testColumn = {
    Attributes: {
      id: 'Attributes',
      list: [
        // 'Divisions'
        divisions,
        locations,
        departments,
        roles
    ],
    },
    OrgTree: {
      id: 'OrgTree',
      list: [],
    },
  }
