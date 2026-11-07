# Trả lời câu hỏi bổ sung – Buổi 9 BookStore

**Họ tên:** Nguyễn Đức Trí  **MSSV:** 23689511

## 1. Giá trị dẫn xuất

`errors` và `valid` đều suy ra được từ `name`, `phone`, `address` và giỏ hàng, nên tính lại mỗi lần render thì luôn khớp với dữ liệu hiện tại. Nếu lưu bằng `useState` riêng, ta phải nhớ cập nhật chúng ở mọi chỗ gọi `setName`, `setPhone`, `setAddress`, `clear`… Chỉ cần quên một chỗ là lỗi hiện sai hoặc nút "Xác nhận đặt hàng" sáng/mờ sai, vì hai nguồn dữ liệu bị lệch nhau.

## 2. Thứ tự gọi

Nếu `clear()` chạy trước `await createOrder(...)` mà mất mạng, giỏ đã bị xoá (cả trong store lẫn AsyncStorage) trong khi đơn chưa hề được tạo trên server. Người dùng vừa mất đơn vừa mất hàng đã chọn, phải chọn lại từ đầu. Đặt `clear()` ngay sau `createOrder` là đúng vì khi đó server đã nhận đơn thành công; nếu `createOrder` ném lỗi thì code nhảy thẳng xuống `catch` và giỏ được giữ nguyên để bấm thử lại.

## 3. PUT hay PATCH

`PUT /users/1` với `{ name, phone }` sẽ thay toàn bộ object, nên user đó trong `db.json` chỉ còn `id`, `name`, `phone`; mất `email` và `password` (không đăng nhập được nữa). `PATCH` chỉ ghi đè các trường được gửi lên, giữ nguyên phần còn lại, nên an toàn cho form chỉ sửa một phần như hồ sơ này.

## 4. Cập nhật lạc quan

Nếu bỏ đoạn hoàn lại `read: false` trong `catch` thì khi mất mạng giao diện vẫn báo "đã đọc" trong khi server vẫn lưu "chưa đọc"; thoát ra vào lại màn là thông báo quay về chưa đọc, người dùng sẽ thấy khó hiểu vì dữ liệu hai phía không khớp. Nên dùng cách này cho thao tác nhẹ, ít sai, sai cũng không hại: đánh dấu đã đọc, thả tim yêu thích. Không nên dùng cho thanh toán/đặt hàng, vì phải chắc chắn server đã nhận đơn rồi mới được báo thành công và xoá giỏ.

## 5. Code bổ sung: bộ lọc trạng thái ở màn Đơn hàng

Thêm state `status` (`"all" | OrderStatus`) và một hàng nút lọc; chỉ sửa chỗ truyền `data` cho FlatList:

```tsx
const [status, setStatus] = useState<"all" | OrderStatus>("all");
...
<FlatList data={orders.filter((o) => status === "all" || o.status === status)} ... />
```

(Ảnh chụp màn hình: xem thư mục `screenshots/` hoặc dán ảnh vào đây sau khi chạy app.)

## Ghi chú nộp bài

- Đã làm đủ Bài 9.1 → 9.8.
- Đã làm thử thách **BT9.C1** (nút "Mua lại" ở đơn đã hoàn tất).
- Chưa chạy thử trên điện thoại thật bằng Expo Go.
