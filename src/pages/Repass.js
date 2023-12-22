
import { useState } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Image source={require('../v2.png')} style={styles.logo}/>
      <Text style={styles.textTitle}>
        Recuperação de
        Senha
      </Text>
      
      <View style={styles.email}>
        <Text style={styles.txtemail}>
          E-mail
        </Text>
      <View/>
      
      <TextInput style={styles.input}
        placeholder='Digite seu email'
        value={email}
        onChangeText={(texto) => setEmail(texto)}
        />
      </View>
      
      <TouchableOpacity  style={styles.botao}>
        <View>  
          <Text style={styles.enviar}>Enviar</Text>    
        </View>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 410, 
    height: 150,
    marginTop: 20,
    marginBottom: 50,
  },
  textTitle: {
    color: '#515151',
    textAlign: 'center',
    fontFamily: 'Arial',
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 60,
    marginBottom: 20,
  },
  email: {
    alignContent: 'center',
    margin: 5,
  },
  txtemail: {
    color: '#515151',
    fontFamily: 'Arial',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  input: {
    width: 301,
    height: 45,
    borderWidth: 1,
    borderColor: 'rgba(87, 87, 87, 0.40)',
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  enviar: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Arial',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  botao: {
    width: 200,
    height: 35,
    backgroundColor: '#008AFF',
    borderRadius: 4,
    alignContent: 'center',
    justifyContent: 'center',
    margin: 20,
    marginBottom: 70,
  },  
});