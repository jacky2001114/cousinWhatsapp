import * as React from 'react';

import Deal from '../Tools/Deal';

const title:string[] = ['幾號餐', '湯底', '4元餸', '6元餸', '辣度', '飲品'];

function Set_1() {
  return (
      <h2>This CosuinDeal , you can add some jsx in here</h2>
  )
}

function Set_2() {
  return (
      <h2>This CosuinDeal , you can add some jsx in here</h2>
  )
}

function Set_3() {
  return (
      <h2>This CosuinDeal , you can add some jsx in here</h2>
  )
}

function Set_4() {
  return (
      <h2>This CosuinDeal , you can add some jsx in here</h2>
  )
}

function Set_5() {
  return (
      <h2>This CosuinDeal , you can add some jsx in here</h2>
  )
}

function Set_6() {
  return (
      <h2>This CosuinDeal , you can add some jsx in here</h2>
  )
}


const content:any[] = [
                      <Set_1 key={1}/>,
                      <Set_2 key={2}/>,
                      <Set_3 key={3}/>,
                      <Set_4 key={4}/>,
                      <Set_5 key={5}/>,
                      <Set_6 key={6}/>,]

function CousinDeal(){
  return (
    <Deal stepsTitle={title} stepsContent={content}/>
  )
}

export default CousinDeal;