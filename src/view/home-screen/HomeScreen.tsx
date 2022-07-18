import { StyleSheet, Text, View } from 'react-native';

const ComponentFactory = () => () => {
  return (
    <View style={styles.container}>
      <Text>Hello from HomeScreen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Type = ReturnType<typeof ComponentFactory>;

export default ComponentFactory;
export type { Type };