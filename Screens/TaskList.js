import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Animated, TouchableHighlight, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import {fetchTask} from '../store/actions/task';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Icons} from '@expo/vector-icons';


class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userTasks: []
    };
  }

  componentDidMount() {
      this.props.getTasks({
        onSuccess: () => {
         this.setState((state, props) => ({userTasks: this.props.tasks}));
        },
        onFailure: () => {}
      });
     
  }

   closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
};

 deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...this.state.tasks];
    const prevIndex = this.state.tasks.findIndex(item => item.task === rowKey);
    newData.splice(prevIndex, 1);
    this.setState((state, props) => ({userTasks: newData}));
};

   renderItem = data => (
    <TouchableHighlight
        onPress={() => console.log('You touched me')}
        style={styles.rowFront}
        underlayColor={'#AAA'}
    >
        <View>
            <Text>{data.item.task}</Text>
        </View>
    </TouchableHighlight>
);

 renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
        <Text>Left</Text>
        <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => this.closeRow(rowMap, data.item.task)}
        >
            <Text style={styles.backTextWhite}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() => this.deleteRow(rowMap, data.item.task)}
        >
            <Text style={styles.backTextWhite}>Delete</Text>
        </TouchableOpacity>
    </View>
);

onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
};



  render() {
    return (
       <View style={styles.container}>
          <SwipeListView
                keyExtractor={(item) => item.task}
                data={this.props.tasks}
                renderItem={this.renderItem}
                renderHiddenItem={this.renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={this.onRowDidOpen}
            
                
            />
       </View>
    );
  }
}

function mapStateToProps(state)  {
return {
    tasks: state.task.userTasks
}
} 

const mapDispatchToProps = (dispatch) => { 
    return {
      getTasks: ({onSuccess, onFailure}) => dispatch(fetchTask({onSuccess, onFailure})) 
    }
  };


const styles = StyleSheet.create({

   container: {
       flex: 1,
       marginTop: 50
   },
   rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
},
backTextWhite: {
    color: '#FFF',
},
rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
},
backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
},
backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
},
backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
},
trash: {
    height: 25,
    width: 25,
},
}); 

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);