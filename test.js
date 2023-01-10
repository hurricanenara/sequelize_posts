// const isCustomer = type === 'customer';
// const findUser = isCustomer
//   ? this.loginService.findOneCustomer
//   : this.loginService.findOneDriver;

// const user = findUser(id);
// const userId = user.customerId || user.driverId; // customer 와 driver 의 아이디값을 제네릭하게 id 라고 하였으면 더 좋았겠습니다

// if (!user || !passwordTest)
//   return res.status(412).json({
//     success: false,
//     message: '아이디 또는 비밀번호가 일치하지 않습니다.',
//   });

// const accessToken = jwt.sign({ userId, type }, 'my-secrect-key', {
//   expiresIn: '1d',
// });
// res.cookie('accessToken', accessToken);

// // return res.redirect(isCustomer ? '/customer' : '/driver');

// //

// // return findOrder.map((order) => {
// //   const {
// //     orderId,
// //     customerId,
// //     driverId,
// //     phone,
// //     address,
// //     request,
// //     status,
// //     usageTime,
// //     usageDateTimeStart,
// //     Customer,
// //   } = order;
// //   return {
// //     orderId,
// //     customerId,
// //     driverId,
// //     phone,
// //     address,
// //     request,
// //     status,
// //     usageDateTimeStart: moment(usageDateTimeStart).format(
// //       'YYYY-MM-DD HH:mm:ss'
// //     ),
// //     usageTime,
// //     customerName: Customer.name,
// //   };
// // });

// // getOrders.map((orders) => {
// //   const { id, nickname, address, content, image, status } = orders;

// //   return {
// //     id,
// //     nickname,
// //     address,
// //     content,
// //     image,
// //     step,
// //   };
// // });

// const myFunction = (a, b, c, d) => {
//   return arguments;
// };

// console.log(myFunction('1', '1', '1', '1'));

return allHost.map(({ userId, laundryId }) => {
  return {
    userId,
    laundryId,
  };
});
