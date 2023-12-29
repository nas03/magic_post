from autogen import AutoGen

auto = AutoGen()
sql_file = "./../sql/add_data.sql"

num_branch = 100


def gen_location(sql_file):
    branch_locations = auto.gen_location(nums=100)
    branch_types = auto.gen_branch_type(nums=100, weights=[0.8, 0.2])
    branch_names = auto.gen_branch_name(branch_types)

    locations = ",\n".join(
        [
            f"(`{branch_names[i]}`, `{branch_locations[i]}`, `{branch_types[i]}`)"
            for i in range(num_branch)
        ]
    )
    with open(sql_file, "a", encoding="utf-8") as f:
        f.write(
            f"INSERT INTO `Location` (`name`, `location`, `type`) VALUES \n{locations};\n"
        )


def gen_user(sql_file):
    fullNames = auto.gen_name(nums=401)
    emails = auto.gen_user_email(fullNames)
    passwords = auto.gen_user_password(nums=401)
    roles = (
        ["LEADER"]
        + ["TRANSSHIPMENT_HUB_MANAGER"] * 100
        + ["BRANCH_CENTER_MANAGER"] * 100
        + ["BRANCH_OFFICER"] * 100
        + ["HUB_OFFICER"] * 100
    )
    location_ids = [0]
    for i in range(4):
        location_ids.extend(range(1, 101))

    users = ",\n".join(
        [
            f"(`{emails[i]}`, `{passwords[i]}`, `{fullNames[i]}`, `{roles[i]}`, `{location_ids[i]}`)"
            for i in range(401)
        ]
    )
    with open(sql_file, "a", encoding="utf-8") as f:
        f.write(
            f"INSERT INTO `User` (`email`, `password`, `fullName`, `role`, `location_id`) VALUES \n{users};\n"
        )


if __name__ == "__main__":
    gen_location(sql_file)
    gen_user(sql_file)
