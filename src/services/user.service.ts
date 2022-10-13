import { Request } from "express";
import { sign } from "jsonwebtoken";
import { User } from "../entities";
import { userRepository } from "../repositories";
import { AssertsShape } from "yup/lib/object";
import { hash } from "bcrypt";
import { serializedCreateUserSchema } from "../schemas/user/createUser.schema";
import * as dotenv from "dotenv";
dotenv.config();

interface ILogin {
  status: number;
  message: object;
}

class UserService {
  loaderUser = async (req: Request) => {
    const users: User[] = await userRepository.all();
    return {
      status: 200,
      users: users,
    };
  };

  loginUser = async ({ validated }: Request): Promise<ILogin> => {
    const user: User = await userRepository.findOne({
      email: validated.email,
    });

    if (!user) {
      return {
        status: 401,
        message: { message: "Invalid credentials" },
      };
    }

    if (!(await user.comparePwd(validated.password))) {
      return {
        status: 401,
        message: { message: "Invalid credentials" },
      };
    }

    const token: string = sign({ ...user }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return {
      status: 200,
      message: { token },
    };
  };

  createUser = async ({ validated }: Request): Promise<AssertsShape<any>> => {
    validated.password = await hash(validated.password, 10);
    const user: User = await userRepository.save(validated);

    return await serializedCreateUserSchema.validate(user, {
      stripUnknown: true,
    });
  };

  miLista = [
    "https://www.youtube.com/watch?v=FDpludwY46U&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=1",
    "https://www.youtube.com/watch?v=u4c66cbU9-c&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=2",
    "https://www.youtube.com/watch?v=BpMD-UziYbc&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=3",
    "https://www.youtube.com/watch?v=hfH_dQpEMhk&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=4",
    "https://www.youtube.com/watch?v=e6r1kYZJ1hg&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=5",
    "https://www.youtube.com/watch?v=gUX4rONKdeI&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=6",
    "https://www.youtube.com/watch?v=jRo9W3iHhLc&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=7",
    "https://www.youtube.com/watch?v=W0Ha0nqpVtY&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=8",
    "https://www.youtube.com/watch?v=d-Jm5BqIHms&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=9",
    "https://www.youtube.com/watch?v=XafjwXQ7OF8&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=10",
    "https://www.youtube.com/watch?v=7UlUMa8dlBg&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=11",
    "https://www.youtube.com/watch?v=2WLfNPD0uhw&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=12",
    "https://www.youtube.com/watch?v=xAzZsKdefi0&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=13",
    "https://www.youtube.com/watch?v=KARmqJz3Ktg&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=14",
    "https://www.youtube.com/watch?v=lVBzxAcXTVk&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=15",
    "https://www.youtube.com/watch?v=724USSpz4ls&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=16",
    "https://www.youtube.com/watch?v=1fkhW76iKSs&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=17",
    "https://www.youtube.com/watch?v=5Zm_BUpeWHI&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=18",
    "https://www.youtube.com/watch?v=MnBH-e_BpZQ&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=19",
    "https://www.youtube.com/watch?v=4C23Lx1lwso&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=20",
    "https://www.youtube.com/watch?v=BjHv6tOnhn0&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=21",
    "https://www.youtube.com/watch?v=BwISjJU028U&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=22",
    "https://www.youtube.com/watch?v=0LeRHv_eCgk&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=23",
    "https://www.youtube.com/watch?v=AlTWVhSsndI&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=24",
    "https://www.youtube.com/watch?v=T5jU2aXD0cI&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=25",
    "https://www.youtube.com/watch?v=qQuZ30_VVbU&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=26",
    "https://www.youtube.com/watch?v=xlkwuGo10Os&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=27",
    "https://www.youtube.com/watch?v=DRYgNLQNjmU&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=28",
    "https://www.youtube.com/watch?v=rDqhjaMUu8I&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=29",
    "https://www.youtube.com/watch?v=SvLmewB4-tc&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=30",
    "https://www.youtube.com/watch?v=LL5Pak4zcuA&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=31",
    "https://www.youtube.com/watch?v=pnjg15RB6f8&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=32",
    "https://www.youtube.com/watch?v=8hKR6ohrexE&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=33",
    "https://www.youtube.com/watch?v=i_1znegpxLI&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=34",
    "https://www.youtube.com/watch?v=KAu7WO38klQ&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=35",
    "https://www.youtube.com/watch?v=h2zY2yqEhH8&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=36",
    "https://www.youtube.com/watch?v=PRVP3fMMOJ8&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=37",
    "https://www.youtube.com/watch?v=Sju2hLQ6hKU&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=38",
    "https://www.youtube.com/watch?v=aARgwr11kt4&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=39",
    "https://www.youtube.com/watch?v=AEIOZHynZ10&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=40",
    "https://www.youtube.com/watch?v=BaJF1Tg3CJM&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=41",
    "https://www.youtube.com/watch?v=GHr5fUzMD-8&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=42",
    "https://www.youtube.com/watch?v=q7ckGf7nsU4&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=43",
    "https://www.youtube.com/watch?v=niiUqUc9j1s&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=44",
    "https://www.youtube.com/watch?v=zoxr6xrtoa8&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=45",
    "https://www.youtube.com/watch?v=Vwpc1inHrwA&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=46",
    "https://www.youtube.com/watch?v=5pCbe4IUoSQ&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=47",
    "https://www.youtube.com/watch?v=dq4XfQZJrbg&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=48",
    "https://www.youtube.com/watch?v=YiYxrq_0LuI&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=49",
    "https://www.youtube.com/watch?v=s8iTxsqiiqM&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=50",
    "https://www.youtube.com/watch?v=k-O7d-lvwtE&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=51",
    "https://www.youtube.com/watch?v=ZKGM3HzpOZo&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=52",
    "https://www.youtube.com/watch?v=hNdx9bWb_0s&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=53",
    "https://www.youtube.com/watch?v=2rH9XgY6SGQ&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=54",
    "https://www.youtube.com/watch?v=L81Mjny13d4&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=55",
    "https://www.youtube.com/watch?v=5-PCVhz6uzg&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=56",
    "https://www.youtube.com/watch?v=86bzYwgHtG4&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=57",
    "https://www.youtube.com/watch?v=uNq843-YAvo&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=58",
    "https://www.youtube.com/watch?v=ogxYKQWtuCo&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=59",
    "https://www.youtube.com/watch?v=2khAUPUJ5VM&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=60",
    "https://www.youtube.com/watch?v=EUHb7-depCY&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=61",
    "https://www.youtube.com/watch?v=gwi_gzBwl98&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=62",
    "https://www.youtube.com/watch?v=xopoI-il52Y&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=63",
    "https://www.youtube.com/watch?v=Dh24lTXOorc&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=64",
    "https://www.youtube.com/watch?v=38nr_ig4oYk&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=65",
    "https://www.youtube.com/watch?v=1XYJWYHuZdg&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=66",
    "https://www.youtube.com/watch?v=IN0WMRcnYq4&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=67",
    "https://www.youtube.com/watch?v=98rSocNlrtw&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=68",
    "https://www.youtube.com/watch?v=4XkYx2_xuPA&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=69",
    "https://www.youtube.com/watch?v=vs4fs-zc66M&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=70",
    "https://www.youtube.com/watch?v=wQFi-aVjuo0&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=71",
    "https://www.youtube.com/watch?v=0QqmaJAVCss&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=72",
    "https://www.youtube.com/watch?v=r130BsOP1Cs&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=73",
    "https://www.youtube.com/watch?v=pDF_yaObO8M&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=74",
    "https://www.youtube.com/watch?v=1k3ayNZz8jQ&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=75",
    "https://www.youtube.com/watch?v=-0M7gBeQI78&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=76",
    "https://www.youtube.com/watch?v=3-mP_nKu8yQ&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=77",
    "https://www.youtube.com/watch?v=JzD8Fe1ICcw&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=78",
    "https://www.youtube.com/watch?v=EbHIw7hpduI&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=79",
    "https://www.youtube.com/watch?v=j_LfpCFhM1o&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=80",
    "https://www.youtube.com/watch?v=kkHG9hyVZFI&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=81",
    "https://www.youtube.com/watch?v=RDNxaHfPnLE&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=82",
    "https://www.youtube.com/watch?v=j3eoiJdeg9k&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=83",
    "https://www.youtube.com/watch?v=eNDUTp27XrI&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=84",
    "https://www.youtube.com/watch?v=C3cAaEQRlSg&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=85",
    "https://www.youtube.com/watch?v=G4KswVUWNM8&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=86",
    "https://www.youtube.com/watch?v=GVg5Enb5OU4&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=87",
    "https://www.youtube.com/watch?v=HXHaY7MkNoI&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=88",
    "https://www.youtube.com/watch?v=02SEzuF8Yeg&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=89",
    "https://www.youtube.com/watch?v=UiF50HoVxmQ&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=90",
    "https://www.youtube.com/watch?v=manYe2ql8Kg&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=91",
    "https://www.youtube.com/watch?v=neN3QmMPIf4&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=92",
    "https://www.youtube.com/watch?v=Lp2_WQaM8KQ&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=93",
    "https://www.youtube.com/watch?v=jgwICRa17Ts&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=94",
    "https://www.youtube.com/watch?v=Pwa7fRMbURU&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=95",
    "https://www.youtube.com/watch?v=qJXgvVGefyc&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=96",
    "https://www.youtube.com/watch?v=KXB43Rs8SyU&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=97",
    "https://www.youtube.com/watch?v=pcShGyOHlig&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=98",
    "https://www.youtube.com/watch?v=nkGGdNovUXg&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=99",
    "https://www.youtube.com/watch?v=LgbciTZ1VwM&list=PLAPpcKnpMfeO9Fydpl1tTKC9CRRnIMMSK&index=100",
  ];

  myObject = () => {
    const enlaces = this.miLista.map((item) => {
      return {
        number: "",
        title: "",
        url: item,
      };
    });
  };
}

export default new UserService();
