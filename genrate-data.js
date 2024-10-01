import { faker } from "@faker-js/faker";
import fs from "fs";
faker.location = { country: "Viet Nam" };

const randomCategories = (n) => {
  if (n <= 0) return [];

  const categories = [];
  for (let index = 0; index < n; index++) {
    const category = {
      id: faker.string.uuid(),
      name: faker.helpers.arrayElement([
        "Polos",
        "Shirts",
        "Pants",
        "Shorts",
        "Jackets & Coats",
        "Suits",
      ]),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    categories.push(category);
  }

  return categories;
};

const randomProductsList = (categories, n) => {
  if (categories.length === 0) return [];

  const productsList = [];

  for (let index = 0; index < n; index++) {
    const popularityScore =
      index < 12
        ? 99 // 12 sản phẩm đầu tiên có điểm 99
        : faker.number.int({ min: 0, max: 98 });

    const product = {
      categoryId: faker.helpers.arrayElement(categories).id,
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      brand: faker.company.name(), // Thêm thuộc tính brand (thương hiệu)
      color: faker.color.rgb(),
      price:
        index < 13
          ? faker.number.int({ min: 10, max: 200 })
          : faker.number.int({ min: 10, max: 9999, precision: 10 }), // Đặt giá sản phẩm từ 0 đến 12 dưới 200
      description: faker.commerce.productDescription(),
      image: faker.image.urlPicsumPhotos(400, 400),
      quantity: faker.number.int({ min: 0, max: 100 }),
      sold: faker.number.int({ min: 0, max: 100 }),
      size: faker.helpers.arrayElement(["S", "M", "L", "XL"]),
      popularityScore: popularityScore,
      condition: faker.helpers.arrayElement(["new", "used"]), // Thêm thuộc tính condition (tình trạng mới/cũ)
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    productsList.push(product);
  }
  return productsList;
};

// const randomUsers = (n) => {
//   if (n <= 0) return [];
//   const users = [];
//   for (let index = 0; index < n; index++) {
//     const adminUser = {
//       id: faker.datatype.uuid(),
//       email: faker.internet.email(),
//       role: "admin", // Chỉ định role là admin
//       authToken: faker.datatype.string(20),
//     };
//     users.push(adminUser); // Thêm adminUser vào mảng users
//   }
//   return users;
// };

const main = () => {
  // Tạo data mẫu
  const newImages = [
    ///Home
    "https://is4.revolveassets.com/images/up/2024/September/091624_rm_hp_1-1.jpg",
    "https://is4.revolveassets.com/images/up/2024/September/091624_rm_hp_1-2.jpg",
    "https://is4.revolveassets.com/images/up/2024/September/092324_rm_hp_newarrivals.jpg",
    "https://is4.revolveassets.com/images/up/2024/September/091624_rm_hp_3.jpg",
    "https://is4.revolveassets.com/images/up/2024/September/091624_rm_hp_4-1_2x.jpg",
    "https://is4.revolveassets.com/images/up/2024/September/091624_rm_hp_4-2_2x.jpg",
    "https://is4.revolveassets.com/images/up/2024/September/092324_rm_hp_ultimateshades_2x.jpg",
    "https://is4.revolveassets.com/images/up/2024/September/091624_rm_hp_5.jpg",
    "https://is4.revolveassets.com/images/up/2024/September/092324_rm_hp_formalaffair_2x.jpg",
    "https://is4.revolveassets.com/images/up/2024/September/091624_rm_hp_6-2_2x.jpg",
    "https://is4.revolveassets.com/images/up/2024/September/091624_rm_hp_6-3_2x.jpg",
    "https://is4.revolveassets.com/images/up/2024/September/091324_FMxPromo_RMhomepagebanner.jpg",
    ////////////polos
    "https://is4.revolveassets.com/images/p4/n/uv/MLAY-MS68_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/uv/MLAY-MS57_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/uv/OGUR-MS50_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/uv/PLAU-MS224_V1.jpg",
    " https://is4.revolveassets.com/images/p4/n/uv/BOUR-MS58_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/PLAU-MS225_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/SCHF-MS18_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/FOCF-MS13_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/WAOR-MS84M_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/RHYT-MS87_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/PLAU-MS226_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/BOUR-MS34_V1.jpg",
    ///////Shirt
    "https://is4.revolveassets.com/images/p4/n/uv/BOUR-MS54_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/MLAY-MS42_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/RHYT-MS57_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/BRIX-MS39_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/uv/BOUR-MS42_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/PUNF-MS14_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/TILL-MS99_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/RISS-MS16_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/HIFF-MS69_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/RAIL-MS172_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/RAIL-MS172_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/OGUR-MS45_V1.jpg",

    /////Pants
    "https://is4.revolveassets.com/images/p4/n/z/RAIL-MP17_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/MLAY-MP6_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/GJEA-MP2_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/PLAU-MP32_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/KSUB-MP3_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/CIVG-MP7_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/PLAU-MP10_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/MSTF-MP4_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/FMER-MP2_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/DNST-MP3_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/OBEY-MJ12_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/WAOR-MP13_V1.jpg",
    ///////////Shorts
    "https://is4.revolveassets.com/images/p4/n/z/OGUR-MF3_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/OASR-MF7_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/RHAF-MF11_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/CALK-MF4_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/OGUR-MF6_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/OASR-MF18_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/ASRF-MF11_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/DIGR-MX45_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/DIGR-MX40_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/FAHR-MF11_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/PLSU-MF15_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/RHYT-MX54_V1.jpg",

    ///Jackets & Coats
    "https://is4.revolveassets.com/images/p4/n/z/PLAU-MO20_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/STCX-MO259_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/HIFF-MK21_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/OURF-MO24_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/TACF-MO169_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/HNNR-MO2_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/OBEY-MO205_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/SCHF-MO13_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/IROR-MO2_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/RAIL-MO30_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/DPAP-MO2_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/DIER-MO1_V1.jpg",
    //Suits
    "https://is4.revolveassets.com/images/p4/n/z/HNNR-MO2_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/STCX-MO242_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/STCX-MO253_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/STCX-MP109_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/THEO-MP66_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/SSAM-MP1_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/STCX-MO251_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/THEO-MO88_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/CMON-MO7_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/BPLS-MO11_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/HLAN-MO66_V1.jpg",
    "https://is4.revolveassets.com/images/p4/n/z/CMON-MP2_V1.jpg",
  ];

  const categories = randomCategories(6);
  let productsList = randomProductsList(categories, 84); // Sử dụng let ở đây
  // const users = randomUsers(1);

  productsList = productsList.map((product, index) => {
    // Kiểm tra nếu có hình ảnh mới
    if (newImages[index]) {
      return {
        ...product,
        image: newImages[index], // Cập nhật hình ảnh mới
      };
    }
    return product;
  });

  categories[0].name = "Polos";
  categories[1].name = "Shirts";
  categories[2].name = "Pants";
  categories[3].name = "Shorts";
  categories[4].name = "Jackets & Coats";
  categories[5].name = "Suits";
  // Update specific product ranges with category names and IDs
  const categoryMappings = [
    { range: [12, 24], categoryName: "Polos" },
    { range: [25, 36], categoryName: "Shirts" },
    { range: [37, 48], categoryName: "Pants" },
    { range: [49, 60], categoryName: "Shorts" },
    { range: [61, 72], categoryName: "Jackets & Coats" },
    { range: [73, 84], categoryName: "Suits" },
  ];

  categoryMappings.forEach(({ range, categoryName }) => {
    const category = categories.find((cat) => cat.name === categoryName);
    for (let i = range[0]; i <= range[1] && i < productsList.length; i++) {
      productsList[i].categoryId = category.id;
      productsList[i].name = faker.commerce.productName(); // Assign a new product name
    }
  });

  // categoryMappings.forEach(({ range, categoryName }) => {
  //   const category = categories.find((cat) => cat.name === categoryName);

  //   // Check if the category exists
  //   if (category) {
  //     for (let i = range[0]; i <= range[1] && i < productsList.length; i++) {
  //       productsList[i].categoryId = category.id;
  //       productsList[i].name = faker.commerce.productName(); // Assign a new product name
  //     }
  //   } else {
  //     console.warn(`Category not found: ${categoryName}`);
  //   }
  // });
  ///////

  productsList = productsList.map((product, index) => {
    return {
      ...product,
      price: product.price * 0.9, // Giảm giá 10% cho tất cả sản phẩm
      condition: "new", // Đặt tất cả sản phẩm là "mới"
    };
  });

  const db = {
    categories: categories,
    products: productsList,
    users: [],
    carts: [],
    orders: [],
  };

  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("🚀 ~ fs.writeFile ~ Đã lưu file vào thành công:");
  });
};

main();
