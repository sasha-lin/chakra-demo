import React, {  } from 'react';
import { Formik, Form, Field } from 'formik';
import { FormControl, FormErrorMessage, Input, Button, InputGroup, InputLeftAddon, Stack, useToast, Checkbox } from '@chakra-ui/react';
import * as Yup from 'yup';
import axios from 'axios';
import { AiTwotoneMail } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'

const request = axios.create({})

function SignIn () {
  // 注册数据
  const initialValues = {
    email: window.localStorage.getItem('email') || '',
    password: window.localStorage.getItem('password') || '',
    isSave: true
  }

  const toast = useToast()
  // 点击注册按钮
  const handleSubmit = async (values, actions) => {
    console.log(values)
    if (values.isSave) {
      window.localStorage.setItem('email', values.email)
      window.localStorage.setItem('password', values.password)
    }
    const { data } = await request.post('/api/users/login', {
      user: values
    }).catch(() => {
      toast({
        title: "用户登录",
        description: "用户登录失败",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    })
    if ("user" in data) {
      toast({
        title: "用户登录",
        description: "用户登录成功",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    } 
  }

  // 表单验证
  const schema = Yup.object({
    email: Yup.string().email().required('请输入邮箱'),
    password: Yup.string().min(6, '密码最低为六位数')
  })

  return <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
    {(props) => (
        <Form>
          <Stack>
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
            <Field name="isSave">
              {({ field, form }) => (
                <Checkbox {...field} defaultIsChecked>记住我</Checkbox>
              )}
            </Field>
          </Stack>
          <Button
            w="sm"
            mt={4}
            bgColor="blue.400"
            colorScheme="teal"
            borderRadius="full"
            isLoading={props.isSubmitting}
            type="submit"
            _hover={{bgColor: "blue.500"}}
          >
            登录
          </Button>
        </Form>
      )}
  </Formik>
}

export default SignIn
