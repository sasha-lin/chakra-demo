import React, {  } from 'react';
import { Formik, Form, Field } from 'formik';
import { FormControl, FormErrorMessage, Input, Button, Box, Link, InputGroup, InputLeftAddon, Stack, useToast } from '@chakra-ui/react';
import * as Yup from 'yup';
import axios from 'axios';
import { FaUserAlt } from 'react-icons/fa'
import { AiTwotoneMail } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'

const request = axios.create({})

function SignUp () {
  // 注册数据
  const initialValues = {
    username: '',
    email: '',
    password: ''
  }

  const toast = useToast()
  // 点击注册按钮
  const handleSubmit = async (values, actions) => {
    console.log(values)
    const { data } = await request.post('/api/users', {
      user: values
    }).catch(() => {
      toast({
        title: "用户注册",
        description: "用户注册失败",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    })
    if ("user" in data) {
      toast({
        title: "用户注册",
        description: "用户注册成功",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    } 
  }

  // 表单验证
  const schema = Yup.object({
    username: Yup.string().max(15, '用户昵称不能大于15').required('请输入用户名'),
    email: Yup.string().email().required('请输入邮箱'),
    password: Yup.string().min(6, '密码最低为六位数')
  })

  return <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
    {(props) => (
        <Form>
          <Stack>
            <Field name="username">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.username && form.touched.username}>
                  <InputGroup>
                    <InputLeftAddon children={<FaUserAlt />} />
                    <Input {...field} id="username" placeholder="您的昵称" />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.email && form.touched.email}>
                  <InputGroup>
                    <InputLeftAddon children={<AiTwotoneMail />} />
                    <Input {...field} id="email" placeholder="邮箱" />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.password && form.touched.password}>
                  <InputGroup>
                    <InputLeftAddon children={<RiLockPasswordFill />} />
                    <Input {...field} id="password" type="password" placeholder="设置密码" />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            
          </Stack>
          <Button
            w="sm"
            mt={4}
            bgColor="green.400"
            colorScheme="teal"
            borderRadius="full"
            isLoading={props.isSubmitting}
            type="submit"
            _hover={{bgColor: "green.500"}}
          >
            注册
          </Button>
          <Box my="2" mx="auto" w="50%" fontSize="12" colorScheme="blue">
            点击注册即表示您统一并愿意遵循简书
            <Link color="blue.400">用户协议</Link>
            和
            <Link color="blue.400">隐私政策</Link>
          </Box>
        </Form>
      )}
  </Formik>
}

export default SignUp
