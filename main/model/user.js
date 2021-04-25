import ioa from 'ioa';

const { ormv } = ioa.app;

export default ormv.model('user', {
  'id': {
     type: 'integer',
     primaryKey: true
  },
  'name': {
     type: 'char',
     comment: "名称",
     uniqueIndex: true,
  },
  'address': [
     {
        type: 'array',
        comment: "地址"
     }
  ],
  'email': {
     type: 'email',
     uniqueIndex: true,
  },
});
