import React, {useRef} from 'react';
import {View, Text, TextInput, StyleSheet, Keyboard} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  reviewInputContainer: {
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  inputBox: {
    backgroundColor: 'white',
    padding: 5,
    marginTop: 5,
  },
});

export default function ReviewInput() {
  const textInputRef = useRef<TextInput>(null);
  const onSubmitHandler = ({nativeEvent}) => {
    axios.post();
  };
  return (
    <View style={styles.reviewInputContainer}>
      <Text style={{fontWeight: 'bold'}}>리뷰 작성</Text>
      <TextInput
        ref={textInputRef}
        style={styles.inputBox}
        placeholder="리뷰를 입력해주세요"
        returnKeyType="send"
        onSubmitEditing={onSubmitHandler}
        onBlur={() => textInputRef.current?.clear()}
      />
    </View>
  );
}
