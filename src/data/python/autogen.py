import random

from unidecode import unidecode

first_names = [
    "Nguyễn",
    "Trần",
    "Lê",
    "Phạm",
    "Hoàng",
    "Huỳnh",
    "Phan",
    "Vũ",
    "Võ",
    "Đặng",
    "Bùi",
    "Đỗ",
    "Hồ",
    "Ngô",
    "Dương",
    "Lý",
    "Trịnh",
    "Đinh",
    "Mai",
    "Lê Viết",
    "Chu",
    "Cao",
    "Nghiêm",
    "Lương",
    "Đoàn",
    "Tạ",
    "Tô",
    "Quách",
    "Lục",
    "Hà",
]

middle_names = [
    "Văn",
    "Hữu",
    "Thị",
    "Gia",
    "An",
    "Hoài",
    "Thanh",
    "Minh",
    "Ngọc",
    "Thuỳ",
    "Hồng",
    "Bảo",
    "Đức",
    "Quốc",
    "Thịnh",
    "Duy",
    "Trung",
    "Linh",
    "Phương",
    "Diệu",
    "Việt",
    "Tú",
    "Hà",
    "Mai",
    "Nam",
    "Nhi",
    "Tâm",
    "Khánh",
    "Hải",
    "Lan",
]

last_names = [
    "Quang",
    "Tuấn",
    "Dũng",
    "Vinh",
    "Hiếu",
    "Anh",
    "Bình",
    "An",
    "Cường",
    "Hùng",
    "Mạnh",
    "Quân",
    "Dũng",
    "Huy",
    "Khang",
    "Long",
    "Nam",
    "Phong",
    "Thắng",
    "Trung",
    "Vũ",
    "Chi",
    "Hà",
    "Hương",
    "Lan",
    "Mai",
    "Ngân",
    "Thảo",
    "Uyên",
    "Yến",
    "Hoàng",
    "Minh",
    "Nga",
    "Phúc",
    "Tú",
    "Vy",
    "Sơn",
    "Đức",
    "Tùng",
    "Dư",
]

street = [
    "Trần Thái Tông",
    "Đốc Thiết",
    "Nguyễn Trãi",
    "Lê Lợi",
    "Phan Chu Trinh",
    "Bà Triệu",
    "Phạm Hùng",
    "Lê Mao",
    "Nguyễn Văn Cừ",
    "Hồ Tùng Mậu",
    "Trần Quốc Hoàn",
    "Quang Trung",
    "Mai Hắc Đế",
    "Phạm Ngọc Thạch",
    "Thái Hà",
    "Lê Nin",
    "Huỳnh Thúc Kháng",
    "Phan Đình Phùng",
    "Đình Thôn",
    "Hà Huy Tập",
    "Lý Thái Tổ",
    "Trần Nhân Tông",
    "Trần Quốc Vượng",
    "Nguyễn Phong Sắc",
    "Đinh Tiên Hoàn",
    "Âu Cơ",
    "Võ Thị Sáu",
    "Trần Quang Diệu",
    "Nguyễn Văn Cừ",
    "Hồng Bàng",
    "Trần Phú",
    "Lý Thường Kiệt",
    "Lê Văn Lương",
]

ward = [
    "Hưng Bình",
    "Mỹ Đình",
    "Dịch Vọng",
    "Dịch Vọng Hậu",
    "Tân Mai",
    "Trung Hoà",
    "Linh Đàm",
    "Bến Thành",
    "Hoàng Văn Thụ",
    "Tân Thành",
    "Hoà Xuân",
    "Phú Hưng",
    "Tân Định",
    "Trường Thi",
    "Trung đô",
    "Phúc Yên",
    "Tân Yên",
    "Hưng An",
    "An Hoà",
    "Long Bình",
    "Yên Sở",
    "Phú Đô",
    "Nghĩa Tân",
    "Bắc Sơn",
    "Quang Minh",
    "Hà Huy Tập",
    "Trung Hoà",
]

district = [
    "Cầu Giấy",
    "Đống Đa",
    "Ba Đình",
    "Hai Bà Trưng",
    "Hoàn Kiếm",
    "Hoàng Mai",
    "Long Biên",
    "Tây Hồ",
    "Thanh Xuân",
    "Bắc Từ Liêm",
    "Cầu Giấy",
    "Đống Đa",
    "Hà Đông",
    "Hai Bà Trưng",
    "Hoàn Kiếm",
    "Hoàng Mai",
    "Long Biên",
    "Nam Từ Liêm",
    "Tây Hồ",
    "Thanh Xuân",
    "Ba Đình",
    "Sơn Trà",
    "Bình Thạnh",
    "Hải Châu",
    "Thanh Khê",
]

province = [
    "Hà Nội",
    "Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Tĩnh",
    "Hải Dương",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
]

lst_branch_types = ["BRANCH", "TRANSSHIPMENT_HUB"]

tailer = "@magicpost.com"

char = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "~",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "-",
    "+",
    "=",
    "{",
    "[",
    "}",
    "]",
    "|",
    ":",
    ";",
    "<",
    ",",
    ">",
    ".",
    "?",
    "/",
]


class AutoGen:
    def __init__(self):
        pass

    def gen_location(self, nums):
        rand_locations = []
        for i in range(nums):
            rand_locations.append(
                f"Số  {random.randint(1, 200)}, {random.choice(street)}, {random.choice(ward)}, "
                f"{random.choice(district)}, {random.choice(province)}"
            )
        return rand_locations

    def gen_branch_type(self, nums, weights):
        branch_types = random.choices(lst_branch_types, weights, k=nums)
        self.branch_types = branch_types
        return branch_types

    def gen_branch_name(self, branch_types):
        names = []
        branch_cnt = 0
        hub_cnt = 0
        for type in branch_types:
            if type == "BRANCH":
                branch_cnt += 1
                names.append(f"BRANCH-{branch_cnt}")
            else:
                hub_cnt += 1
                names.append(f"HUB-{hub_cnt}")

        return names

    def gen_name(self, nums):
        names = []
        for i in range(nums):
            first_name = random.choice(first_names)
            middle_name = random.choice(middle_names)
            last_name = random.choice(last_names)
            names.append(f"{first_name} {middle_name} {last_name}")

        return names

    def gen_user_email(self, names):
        emails = []
        for name in names:
            emails.append(unidecode(name.replace(" ", "").lower() + tailer))
        return emails

    def gen_user_password(self, nums):
        passwords = []
        for i in range(nums):
            passwords.append("".join(random.choices(char, k=random.randint(8, 10))))

        return passwords
