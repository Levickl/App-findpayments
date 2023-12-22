
import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doLogin } from '../services/auth.js';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from 'react-native';

export default function Login() {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState('');

  const saveForm = async () => {
    try {
      const { data, status } = await doLogin(form);
      if (status === 'success') {

        const user = {
          id: data.user.id,
          username: data.user.username,
          name: data.user.full_name,
          email: data.user.email,
          role: data.user.role,
          division: data.user.division,
          company: data.user.company
        };
        AsyncStorage.setItem('token', data.token);
        navigation.navigate('Home', { screen: 'sHome', params: { user } });

      }


    } catch (error) {
      const path = error.response?.data.errors;
      setError(path);

      console.log(error);

      if (error.response?.data.message === 'Credenciais invalidas') {
        console.log("Entrou");
        ToastAndroid.showWithGravityAndOffset(
          'Nome de usuário ou senha incorretos',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );

        setForm({
          username: '',
          password: ''
        })
      }
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../v2.png')} style={styles.logo} />
      <Text style={styles.textTitle}>
        Login
      </Text>

      <View style={styles.email}>
        <Text style={styles.txtemail}>
          Nome
        </Text>
        <View />

        <TextInput style={styles.input}
          value={form.username}
          onChangeText={(texto) => setForm({
            ...form,
            username: texto
          })}
        />
      </View>

      <View style={styles.senha}>
        <Text style={styles.txtsenha}>
          Senha
        </Text>
        <TextInput style={styles.input}
          value={form.password}
          secureTextEntry={true}
          onChangeText={(texto) => setForm({
            ...form,
            password: texto
          })}
        />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.esqueceuASenha}>
          Esqueceu a senha?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Repass')}>
          <View>
            <Text style={styles.cliqueAqui}>
              clique aqui
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botao} onPress={saveForm/**/}>
        <View>
          <Text style={styles.entrar}>Entrar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 410,
    height: 150,
    marginTop: 20,
  },
  textTitle: {
    color: '#515151',
    textAlign: 'center',
    fontFamily: 'Arial',
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 100,
    marginBottom: 50,
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
  senha: {
    alignContent: 'center',
    margin: 5,
  },
  txtsenha: {
    color: '#515151',
    fontFamily: 'Arial',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  esqueceuASenha: {
    color: '#515151',
    textAlign: 'center',
    fontFamily: 'Arial',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '700',
    marginRight: 205,
  },
  cliqueAqui: {
    color: '#008AFF',
    textAlign: 'center',
    fontFamily: 'Arial',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '700',
    marginLeft: -355,
  },
  entrar: {
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