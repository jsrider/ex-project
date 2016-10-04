import React from 'react';

const Alert = (props) => {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />


      <div className="alerm">

        <ul >
          <li>
            <RangePicker style={{ width: 150 }} onChange={onChange} />
            <Button type="ghost" icon="search">查询</Button>
          </li>
          <li>
            <Select showSearch
                    style={{ width: 150 }}
                    placeholder="请选择站点"
                    optionFilterProp="children"
                    notFoundContent="Nothing found"
                    onChange={handleChange}

            >
              <Option value="总览">总览</Option>
              <Option value="A检测点">A检测点</Option>
              <Option value="B检测点">B检测点</Option>
              <Option value="C检测点">C检测点</Option>
              <Option value="D检测点">D检测点</Option>
            </Select>
            <Button type="ghost" icon="search">查询</Button>
          </li>
          <li>
            <Select showSearch
                    style={{ width: 150 }}
                    placeholder="请选择检测点"
                    optionFilterProp="children"
                    notFoundContent="Nothing found"
                    onChange={handleChange}

            >
              <Option value="总览">总览</Option>
              <Option value="A检测点">A检测点</Option>
              <Option value="B检测点">B检测点</Option>
              <Option value="C检测点">C检测点</Option>
              <Option value="D检测点">D检测点</Option>
            </Select>
            <Button type="ghost" icon="search">查询</Button>
          </li>
          <li>
            <Select showSearch
                    style={{ width: 150 }}
                    placeholder="请选择异常检测量"
                    optionFilterProp="children"
                    notFoundContent="Nothing found"
                    onChange={handleChange}

            >
              <Option value="总览">总览</Option>
              <Option value="A检测点">A检测点</Option>
              <Option value="B检测点">B检测点</Option>
              <Option value="C检测点">C检测点</Option>
              <Option value="D检测点">D检测点</Option>
            </Select>
            <Button type="ghost" icon="search">查询</Button>
          </li>
        </ul>



      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>

    </div>
  );
};

Alert.propTypes = {
};

export default Alert;
