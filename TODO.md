**@lvdthieu**
- chuyển query trong file data/query.sql sang Prisma format trong các file tương ứng (Làm PostService và UserServices trước) 
- sử dụng function cleanup có sẵn để close connection sau mỗi query
- fetch data từ prisma trực tiếp và render sang UI tương ứng
 + import { UserServices } from '@/src/prisma';
VD: Query getAllPostLocation -> Chủ thể là Post -> Đặt trong PostServices.js

**@nas03** 
- thêm chức năng auth bằng tài khoản Google, Facebook
- viết api để fetch data từ prisma (CRUD)
- quản lý session và user role
- hoàn thiện query database

*Lưu ý*: Xong phần nào thì ghi done bên cạnh đầu việc đó hoặc ghi done - <task gì đó>