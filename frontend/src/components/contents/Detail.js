import React, { Component } from 'react';
import { AppContext } from '../../contexts/appContext';
import { withStyles, Button, Typography, Card, CardContent, CardMedia, Divider, List, ListItem, ListItemText, Avatar } from '@material-ui/core';
import { Group, Place, Update, Category, } from '@material-ui/icons';
/* global naver */

const style = theme => ({
  root: {
    background: '#F7F7F7',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainHeader: {
    width: '100%',
    height: 220,
    marginTop: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'white',
  },
  topContainer: {
    width: '68%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  simpleInformContainer: {
    height: '88%',
    width: '58%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  informTextContainer: {
    marginBottom: 25,
  },
  groupIcon: {
    width: 100,
    height: 50,
    marginBottom: 25,
    color: '#90CAF9',
  },
  joinContainer: {
    height: '88%',
    width: '25%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 60,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    width: '80%',
    color: 'black',
    margin: theme.spacing.unit,
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    width: '70%',
    marginTop: 50,
    marginBottom: 50,
  },
  detailContainer: {
    width: '60%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  detailContent: {
    width: '82%',
    marginBottom: 25,
  },
  avatarIcon: {
    backgroundColor: '#90CAF9',
  },
  naverMap: {
    width: '100%',
    height: 350,
  },
});

class Detail extends Component {
  static contextType = AppContext;

  state = {
    participants: [],
    content: [],
    detailTerm: this.props.match.params.id,
  };

  async componentDidMount() {
    const { detailTerm, } = this.state;
    const content = await this.context.actions.getContentsDetail(detailTerm);
    const location = await this.getLatLngByAddress(content.userLocation);

    const map = new naver.maps.Map('naverMap', {
      center: new naver.maps.LatLng(location),
      zoom: 10
    });
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(location),
      map: map,
    });

    this.setState({
      content: content,
    });
  };

  getLatLngByAddress = (address) => {
    return new Promise((resolve, reject) => {
      naver.maps.Service.geocode({
        address: address
    }, (status, response) => {
        if (status === naver.maps.Service.Status.ERROR) {
          reject(alert('지도 API 오류입니다.'));
        }
        let item = response.result.items[0]
        resolve(item.point);
      });
    });
  };

  joinStudy = async () => {
    const { detailTerm } = this.state;
    const user = this.context.state.signInInfo.email;
    await this.context.actions.joinStudy(detailTerm);
    this.props.history.push("/");
  };

  render() {
    const { classes } = this.props;
    const { content } = this.state;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return (
      <div className={classes.root}>
        <div className={classes.mainHeader}>
          <div className={classes.topContainer}>
            <Group className={classes.groupIcon} />
            <div className={classes.simpleInformContainer}>
              <div className={classes.informTextContainer}>
                <Typography style={{ marginBottom: 13 }}>{(new Date(content.createdAt)).toLocaleDateString('ko-KR', options)}</Typography>
                <Typography variant="h4">{content.title}</Typography>
              </div>
              <Typography>주최: {content.leader}</Typography>
            </div>
            <div className={classes.joinContainer}>
              {this.context.state.signInInfo.status ? (<div style={{ marginRight: 20 }}>
                <Typography variant="h6">참여 하시겠습니까?</Typography>
                <div className={classes.buttonContainer}>
                  <Button className={classes.button} variant="contained" color="primary" onClick={this.joinStudy}>
                    참여하기
                  </Button>
                </div>
              </div>) : (<div style={{ marginRight: 20, textAlign: 'center' }}>
                <Typography variant="h6" >스터디에 참여 하려면 로그인 해주세요.</Typography>
              </div>)}
            </div>
          </div>
        </div>
        <div className={classes.mainContainer}>
          <div className={classes.detailContainer}>
            <Card className={classes.detailContent}>
              <CardMedia
                component="img"
                alt="coverImg"
                style={{ width: '100%', height: '45vh',}}
                src={`http://localhost:8080/${content.imageUrl}`}
              />
            </Card>
            <div className={classes.detailContent}>
              <Typography variant="h5" style={{ marginBottom: 15 }}>세부 사항</Typography>
              <Typography style={{ width: '88%', fontSize: 18, marginBottom: 25 }} component="p">{`${content.description}`.split('\n').map(str => {
                return (<span key={str}>{str}<br/></span>)
              })}</Typography>
              <Typography variant="h5" style={{ marginBottom: 15 }}>참석자</Typography>
              <Typography>{content.leader}</Typography>
              {content.participants}
            </div>
          </div>
          <Card style={{ width: '35%', height: '80%', }}>
            <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
              <List style={{ minWidth: 180 }}>
                <ListItem>
                  <Avatar className={classes.avatarIcon}><Update /></Avatar>
                  <ListItemText primary="날짜" secondary={(new Date(content.createdAt)).toLocaleDateString('ko-KR', options)} />
                </ListItem>
                <Divider />
                <ListItem>
                  <Avatar className={classes.avatarIcon}><Place /></Avatar>
                  <ListItemText primary="장소" secondary={content.userLocation} />
                </ListItem>
                <Divider />
                <ListItem>
                  <Avatar className={classes.avatarIcon}><Category /></Avatar>
                  <ListItemText primary="분류" secondary={`${content.categories}`} />
                </ListItem>
              </List>
            </CardContent>
            <div id="naverMap" className={classes.naverMap} />
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(Detail);