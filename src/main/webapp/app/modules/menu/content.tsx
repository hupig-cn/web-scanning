import React from 'react';

export const type = [
  {
    position: '1',
    name: '热销'
  },
  {
    position: '2',
    name: '套餐'
  },
  {
    position: '3',
    name: '小炒'
  },
  {
    position: '4',
    name: '主食'
  },
  {
    position: '5',
    name: '酒水'
  }
];

export const food = [
  {
    name: '肉末茄子',
    price: '17',
    img: './content/images/value1.png'
  },
  {
    name: '鱼香肉丝',
    price: '14',
    img: './content/images/value2.png'
  },
  {
    name: '芹菜炒腊肉',
    price: '14',
    img: './content/images/value3.png'
  },
  {
    name: '宫保鸡丁',
    price: '14',
    img: './content/images/value4.png'
  },
  {
    name: '糖醋里脊',
    price: '21',
    img: './content/images/value5.png'
  }
];

export default function LongMenu() {
  return (
    <div>
      <div style={{ width: '20%', overflow: 'hidden', float: 'left' }}>
        {type.map((name, index) => (
          <span
            key={name.position}
            style={{
              float: 'left',
              backgroundColor: name.position === '1' ? '#ffffff' : '#f8f8f8',
              borderRight: name.position === '1' ? 'none' : '1px solid #ececec',
              borderLeft: name.position === '1' ? '1px solid #fe4365' : 'none',
              width: '100%',
              padding: '10px',
              textAlign: 'center',
              borderBottom: '1px solid #ececec',
              color: '#00000095'
            }}
            onClick={() => {
              alert('点了：' + name.name);
            }}
          >
            {name.name}
          </span>
        ))}
        <span
          style={{
            float: 'left',
            height: 'calc(100vh - ' + type.length * 44 + 'px)',
            width: '100%',
            borderRight: '1px solid #ececec'
          }}
        />
      </div>
      <div style={{ width: '80%', overflow: 'hidden', float: 'right' }}>
        {food.map((name, index) => (
          <div
            style={{
              padding: '10px',
              borderBottom: '1px solid #ececec',
              overflow: 'hidden'
            }}
          >
            <span>
              <img
                style={{
                  width: '50px',
                  height: '50px',
                  float: 'left'
                }}
                src={name.img}
              />
            </span>
            <span
              style={{
                float: 'left',
                width: 'calc(100% - 75px)',
                fontSize: '1.05rem',
                marginLeft: '15px'
              }}
            >
              {name.name}
            </span>
            <span
              style={{
                float: 'left',
                width: 'calc(100% - 75px)',
                fontSize: '0.93rem',
                marginLeft: '15px'
              }}
            >
              <span style={{ color: '#fe4365' }}>￥{name.price}</span>/份
              <span style={{ float: 'right' }}>
                <img style={{ width: '20px', height: '20px' }} src="./content/images/cut.png" />
                <span> 1 </span>
                <img src="./content/images/plus.png" />
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
