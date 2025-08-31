import { redirect } from 'next/navigation'

// 默认重定向到英文页面，让客户端处理语言检测
export default function RootRedirect() {
  redirect('/en')
}