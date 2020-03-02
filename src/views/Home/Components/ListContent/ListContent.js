import React, { useState } from 'react';
import { List, message, Avatar, Spin, Row, Col } from 'antd';
import { DislikeTwoTone, LikeTwoTone, MessageTwoTone } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import './styles.css';

export default function ManyComponent() {
    const [listData, setListData] = useState([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);

    const IconText = ({ icon, text }) => (
        <span>
            {icon} {text}
        </span>
    );

    const loadItems = page => {
        // axios
        //     .get(BASE_URI + '/getAllData', {
        //         params: {
        //             page,
        //             page_size: 20
        //         }
        //     })
        //     .then(res => {
        //         const items = res.data;
        //         setTracks([...tracks, ...items.users]);
        //     })
        //     .catch(err => {
        //         setHasMoreItems(false);
        //     });
        const data = [
            {
                title: 'ao nguyen',
                avatar:
                    'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content:
                    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
            }
        ];
        if (listData.length === 20) {
            message.warning('Infinite List loaded all');
            setHasMoreItems(false);
            return;
        }
        setTimeout(setListData([...listData, ...data]), 5000);
    };
    const renderImage = () => {
        const images = [
            {
                src: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
            },
            {
                src: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
            },           
        ];
        return images.map((value, key) => {
            return (
                <div key={key} style={{float: 'left', margin: '3px'}}>
                    <Avatar
                        shape="square"
                        size={164}
                        src={value.src}
                    />
                </div>
            )
        });
    };

    return (
        <div className="list-content">
            <InfiniteScroll
                pageStart={0}
                loadMore={loadItems}
                hasMore={hasMoreItems}
            >
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={listData}
                    renderItem={item => (
                        <List.Item
                            style={{marginTop: '13px'}}
                            key={item.title}
                            actions={[
                                <IconText
                                    icon={<LikeTwoTone />}
                                    text="156"
                                    key="list-vertical-like"
                                />,
                                <IconText
                                    icon={<DislikeTwoTone />}
                                    text="156"
                                    key="list-vertical-dislike"
                                />,
                                <IconText
                                    icon={<MessageTwoTone />}
                                    text="2"
                                    key="list-vertical-message"
                                />
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={item.title}
                                description='12/12/2020'
                            />
                            <Row gutter={[16, 16]}>
                                <Col xl={24} lg={24} md={24} sm={24}>
                                    {item.content}
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]}>
                                <Col xl={24} lg={24} md={24} sm={24}>
                                    {renderImage()}
                                </Col>
                            </Row>
                        </List.Item>
                    )}
                >
                    {hasMoreItems && (
                        <div className="loading-content">
                            <Spin />
                        </div>
                    )}
                </List>
            </InfiniteScroll>
        </div>
    );
}

// export default class InfiniteListExample extends React.Component {
//   state = {
//     data: [],
//     loading: false,
//     hasMore: true,
//   };

//   componentDidMount() {
//     // this.fetchData(res => {
//     //   this.setState({
//     //     data: res.results,
//     //   });
//     // });
//     this.setState({
//         data: [{
//             id: '1',
//             name: 'ao nguyen',
//             email: 'aonguyen@gmail.com'
//         }]
//     });
//   }

// //   fetchData = callback => {
// //     reqwest({
// //       url: fakeDataUrl,
// //       type: 'json',
// //       method: 'get',
// //       contentType: 'application/json',
// //       success: res => {
// //         callback(res);
// //       },
// //     });
// //   };

//   handleInfiniteOnLoad = () => {
//     let { data } = this.state;
//     this.setState({
//       loading: true,
//     });
//     if (data.length > 14) {
//       message.warning('Infinite List loaded all');
//       this.setState({
//         hasMore: false,
//         loading: false,
//       });
//       return;
//     }
//     this.fetchData(res => {
//       data = data.concat(res.results);
//       this.setState({
//         data,
//         loading: false,
//       });
//     });
//   };

//   render() {
//     return (
//       <div className="list-content">
//         <InfiniteScroll
//           initialLoad={false}
//           pageStart={0}
//           loadMore={this.handleInfiniteOnLoad}
//           hasMore={!this.state.loading && this.state.hasMore}
//           useWindow={false}
//         >
//           <List
//             dataSource={this.state.data}
//             renderItem={item => (
//               <List.Item key={item.id}>
//                 <List.Item.Meta
//                   avatar={
//                     <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
//                   }
//                   title={<a href="https://ant.design">{item.name}</a>}
//                   description={item.email}
//                 />
//                 <div>Content</div>
//               </List.Item>
//             )}
//           >
//             {this.state.loading && this.state.hasMore && (
//               <div className="loading-content">
//                 <Spin />
//               </div>
//             )}
//           </List>
//         </InfiniteScroll>
//       </div>
//     );
//   }
// }
