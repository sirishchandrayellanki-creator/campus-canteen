import { useState, useEffect } from "react";
import "./App.css";
import { supabase } from "./supabase";

export default function App() {

  const [screen, setScreen] =
    useState("login");

  const [isSignup, setIsSignup] =
    useState(false);

  const [userName, setUserName] =
    useState("");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [hallTicket, setHallTicket] =
    useState("");

  const [cart, setCart] =
    useState([]);

  const [orders, setOrders] =
    useState([]);

  const [paymentMethod, setPaymentMethod] =
    useState("UPI");

  const [upiId, setUpiId] =
    useState(
      localStorage.getItem("canteenUPI") ||
      "sirishcanteen@upi"
    );

  // COMPLETE NEW MENU
  const menu = [

    // DOSAS
    {
      category: "Dosas",
      items: [
        {
          name: "Egg Dosa",
          price: 50,
          image:
            "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1200&auto=format&fit=crop"
        },

        {
          name: "Masala Dosa",
          price: 40,
          image:
            "https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=1200&auto=format&fit=crop"
        },

        {
          name: "Onion Dosa",
          price: 40,
          image:
            "https://images.unsplash.com/photo-1673442635965-723af2bfead9?q=80&w=1200&auto=format&fit=crop"
        }
      ]
    },

    // CHAPATHI
    {
      category: "Chapathi",
      items: [
        {
          name: "Chapathi",
          price: 40,
          image:
            "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=1200&auto=format&fit=crop"
        },

        {
          name: "Aloo Chapathi",
          price: 40,
          image:
            "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop"
        },

        {
          name: "Chapathi With Egg Curry",
          price: 60,
          image:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop"
        },

        {
          name: "Chapathi With Panner Curry",
          price: 80,
          image:
            "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1200&auto=format&fit=crop"
        },

        {
          name: "Chapathi With Chicken Curry",
          price: 100,
          image:
            "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1200&auto=format&fit=crop"
        }
      ]
    },

    // PAROTAS
    {
      category: "Parotas",
      items: [
        {
          name: "Parota",
          price: 50,
          image:
            "https://images.unsplash.com/photo-1666001051510-126acdf0b418?q=80&w=1200&auto=format&fit=crop"
        },

        {
          name: "Egg Parota",
          price: 80,
          image:
            "https://images.unsplash.com/photo-1628294896516-1f0c6f5f7d54?q=80&w=1200&auto=format&fit=crop"
        },

        {
          name: "Panner Parota",
          price: 100,
          image:
            "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1200&auto=format&fit=crop"
        },

        {
          name: "Chicken Parota",
          price: 100,
          image:
            "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1200&auto=format&fit=crop"
        },

        {
          name: "Dal Parota",
          price: 50,
          image:
            "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop"
        }
      ]
    },

    // NOODLES
    {
      category: "Noodles",
      items: [
        {
          name: "Veg Noodles",
          price: 60,
          image:
            "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1200&auto=format&fit=crop"
        },

        {
          name: "Panner Noodles",
          price: 80,
          image:
            "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1200&auto=format&fit=crop"
        },

        {
          name: "Egg Noodles",
          price: 60,
          image:
            "https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=1200&auto=format&fit=crop"
        },

        {
          name: "Double Egg Noodles",
          price: 70,
          image:
            "https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=1200&auto=format&fit=crop"
        },

        {
          name: "Veg Special Noodles",
          price: 80,
          image:
            "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1200&auto=format&fit=crop"
        },

        {
          name: "Chicken Noodles",
          price: 80,
          image:
            "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1200&auto=format&fit=crop"
        }
      ]
    },

    // FRIED RICE
    {
      category: "Fried Rice",
      items: [
        {
          name: "Egg Fried Rice",
          price: 60,
          image:
            "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1200&auto=format&fit=crop"
        },

        {
          name: "Panner Fried Rice",
          price: 80,
          image:
            "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop"
        },

        {
          name: "Double Egg Fried Rice",
          price: 90,
          image:
            "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1200&auto=format&fit=crop"
        },

        {
          name: "Chicken Fried Rice",
          price: 100,
          image:
            "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1200&auto=format&fit=crop"
        }
      ]
    },

    // MANCHURIA
    {
      category: "Manchuria",
      items: [
        {
          name: "Chicken Manchuria",
          price: 80,
          image:
            "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"
        },

        {
          name: "Veg Manchuria",
          price: 60,
          image:
            "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=1200&auto=format&fit=crop"
        }
      ]
    }

  ];

  useEffect(() => {

    fetchOrders();

    const currentUser =
      JSON.parse(
        localStorage.getItem("currentUser")
      );

    if (currentUser) {

      setUserName(currentUser.name);

      setPhoneNumber(currentUser.phone);

      setHallTicket(
        currentUser.hallTicket
      );

      setScreen("menu");
    }

  }, []);

  const fetchOrders = async () => {

    const { data, error } =
      await supabase
        .from("Orders")
        .select("*")
        .order("id", {
          ascending: false
        });

    if (error) {

      console.log(error);

      return;
    }

    setOrders(data || []);
  };

  const signupUser = () => {

    if (
      userName === "" ||
      phoneNumber === "" ||
      hallTicket === ""
    ) {

      alert("Fill All Details");

      return;
    }

    const users =
      JSON.parse(
        localStorage.getItem(
          "canteenUsers"
        )
      ) || [];

    const alreadyExists =
      users.find(
        (u) =>
          u.phone === phoneNumber
      );

    if (alreadyExists) {

      alert(
        "User Already Exists. Please Login."
      );

      setIsSignup(false);

      return;
    }

    const newUser = {

      name: userName,

      phone: phoneNumber,

      hallTicket: hallTicket
    };

    users.push(newUser);

    localStorage.setItem(
      "canteenUsers",
      JSON.stringify(users)
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify(newUser)
    );

    alert(
      "Signup Successful 🎉"
    );

    setScreen("menu");
  };

  const loginUser = () => {

    const users =
      JSON.parse(
        localStorage.getItem(
          "canteenUsers"
        )
      ) || [];

    const foundUser =
      users.find(
        (u) =>
          u.phone === phoneNumber
      );

    if (!foundUser) {

      alert(
        "User Not Found. Please Signup."
      );

      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(foundUser)
    );

    setUserName(foundUser.name);

    setHallTicket(
      foundUser.hallTicket
    );

    setScreen("menu");
  };

  const logoutUser = () => {

    localStorage.removeItem(
      "currentUser"
    );

    setScreen("login");

    setPhoneNumber("");

    setUserName("");

    setHallTicket("");
  };

  const adminLogout = () => {

    setScreen("login");
  };

  const addToCart = (item) => {

    const existing =
      cart.find(
        (c) =>
          c.name === item.name
      );

    if (existing) {

      setCart(

        cart.map((c) =>

          c.name === item.name

            ? {
                ...c,
                quantity:
                  c.quantity + 1
              }

            : c
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...item,
          quantity: 1
        }
      ]);
    }
  };

  const placeOrder = async () => {

    if (cart.length === 0) {

      alert("🛒 Cart Empty");

      return;
    }

    const total =
      cart.reduce(

        (sum, item) =>

          sum +
          item.price *
            item.quantity,

        0
      );

    const now =
      new Date();

    const date =
      now.toLocaleDateString();

    const time =
      now.toLocaleTimeString();

    const { error } =
      await supabase
        .from("Orders")
        .insert([
          {
            customer: userName,
            phone: phoneNumber,
            payment: paymentMethod,
            total: total,
            items: cart,
            order_date: date,
            order_time: time
          }
        ]);

    if (error) {

      console.log(error);

      alert("❌ Order Failed");

      return;
    }

    const oldOrders =
      JSON.parse(
        localStorage.getItem(
          "myOrders"
        )
      ) || [];

    oldOrders.push({
      items: cart,
      total,
      payment: paymentMethod,
      date,
      time
    });

    localStorage.setItem(
      "myOrders",
      JSON.stringify(oldOrders)
    );

    alert(
      "🎉 Order Placed Successfully\n\n🙏 Thank You For Visiting Our Campus Canteen 🍔🍜"
    );

    setCart([]);

    fetchOrders();

    setScreen("menu");
  };

  const completeOrder = async (id) => {

    const { error } =
      await supabase
        .from("Orders")
        .delete()
        .eq("id", id);

    if (error) {

      console.log(error);

      alert(
        "❌ Failed To Complete Order"
      );

      return;
    }

    alert(
      "✅ Order Completed Successfully 🎉"
    );

    fetchOrders();
  };

  return (

    <div className="container">

      <div
        className="admin-icon"

        onClick={() => {

          const pass =
            prompt(
              "Enter Admin Password"
            );

          if (
            pass === "canteen123"
          ) {

            setScreen("admin");
          }
        }}
      >
        ⚙️
      </div>

      {screen === "login" && (
  <div className="box">

    <h1>
      {isSignup
        ? "Create Account"
        : "Login"}
    </h1>

    {isSignup && (
      <input
        type="text"
        placeholder="Name"
        value={userName}
        onChange={(e) =>
          setUserName(e.target.value)
        }
      />
    )}

    <input
      type="text"
      placeholder="Phone Number"
      value={phoneNumber}
      onChange={(e) =>
        setPhoneNumber(
          e.target.value
        )
      }
    />

    {isSignup && (
      <input
        type="text"
        placeholder="Hall Ticket"
        value={hallTicket}
        onChange={(e) =>
          setHallTicket(
            e.target.value
          )
        }
      />
    )}

    <button
      onClick={() => {

        if (isSignup) {

          signupUser();

        } else {

          loginUser();
        }

      }}
    >

      {isSignup
        ? "Sign Up"
        : "Login"}

    </button>

    <p
      style={{
        marginTop: "15px",
        cursor: "pointer",
        color: "#ff9800",
        fontWeight: "bold"
      }}

      onClick={() =>
        setIsSignup(!isSignup)
      }
    >

      {isSignup
        ? "Already Have Account? Login"
        : "New User? Signup"}

    </p>

    <button
      style={{
        marginTop: "20px"
      }}

      onClick={() => {

        const pass =
          prompt(
            "Enter Admin Password"
          );

        if (
          pass ===
          "canteen123"
        ) {

          setScreen("admin");

        } else {

          alert(
            "Wrong Password"
          );
        }

      }}
    >

      ⚙️ Admin

    </button>

  </div>
)}

      {screen === "menu" && (

        <div>

          <div
            style={{
              textAlign: "center",
              marginBottom: "30px"
            }}
          >

            <h1
              style={{
                fontSize: "45px",
                color: "white"
              }}
            >
              👋 Welcome {userName} 🎉
            </h1>

            <h2
              style={{
                color: "#ff9800",
                fontSize: "35px"
              }}
            >
              🍔 Campus Canteen 🍜
            </h2>

          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              marginBottom: "20px"
            }}
          >

            <button
              onClick={logoutUser}
            >
              🚪 Logout
            </button>

            <button
              onClick={() =>
                setScreen("cart")
              }
            >
              🛒 Cart ({cart.length})
            </button>

            <button
              onClick={() =>
                setScreen("orders")
              }
            >
              📦 My Orders
            </button>

          </div>

          {/* NEW CATEGORY MENU */}

          {menu.map((section, index) => (

            <div key={index}>

              <h1
                style={{
                  color: "#ff9800",
                  marginTop: "40px"
                }}
              >
                🍽️ {section.category}
              </h1>

              <div className="grid">

                {section.items.map((item, i) => (

                  <div
                    className="card"
                    key={i}
                  >

                    <img
                      src={item.image}
                      alt=""
                    />

                    <h2>
                      {item.name}
                    </h2>

                    <p>
                      ₹{item.price}
                    </p>

                    <button
                      onClick={() =>
                        addToCart(item)
                      }
                    >
                      Add
                    </button>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      )}

      {screen === "cart" && (

        <div className="box">

          <button
            onClick={() =>
              setScreen("menu")
            }
          >
            🍔 Back To Menu
          </button>

          <h1>
            🧾 Bill Summary
          </h1>

          {cart.map(
            (item, index) => (

              <div
                key={index}
                className="order"
              >

                <img
                  src={item.image}
                  alt=""
                  style={{
                    width: "120px",
                    borderRadius:
                      "10px"
                  }}
                />

                <h3>
                  {item.name}
                </h3>

                <p>
                  ₹{item.price}
                </p>

                <div>

                  <button

                    onClick={() => {

                      const updated =
                        [...cart];

                      if (
                        updated[index]
                          .quantity > 1
                      ) {

                        updated[index]
                          .quantity -= 1;

                        setCart(updated);

                      } else {

                        updated.splice(
                          index,
                          1
                        );

                        setCart(updated);
                      }
                    }}

                  >
                    ➖
                  </button>

                  <span
                    style={{
                      margin: "10px"
                    }}
                  >
                    {item.quantity}
                  </span>

                  <button

                    onClick={() => {

                      const updated =
                        [...cart];

                      updated[index]
                        .quantity += 1;

                      setCart(updated);
                    }}

                  >
                    ➕
                  </button>

                </div>

                <h3>
                  ₹
                  {item.price *
                    item.quantity}
                </h3>

              </div>

            )
          )}

          <h2>

            Total ₹

            {cart.reduce(

              (sum, item) =>

                sum +
                item.price *
                  item.quantity,

              0
            )}

          </h2>

          <select
            value={paymentMethod}

            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
          >
            <option>
              UPI
            </option>

            <option>
              CASH
            </option>

          </select>

          {paymentMethod === "UPI" && (

            <div
              style={{
                marginTop: "20px",
                background: "#fff",
                padding: "20px",
                borderRadius: "15px",
                color: "black",
                textAlign: "center"
              }}
            >

              <h2>
                📲 Pay Using UPI
              </h2>

              <h1
                style={{
                  color: "green"
                }}
              >
                {upiId}
              </h1>

            </div>

          )}

          <button
            onClick={placeOrder}
          >
            Place Order
          </button>

        </div>

      )}

      {screen === "orders" && (

        <div className="box">

          <button
            onClick={() =>
              setScreen("menu")
            }
          >
            🍔 Back To Menu
          </button>

          <h1>
            📦 My Previous Orders
          </h1>

          {(JSON.parse(
            localStorage.getItem(
              "myOrders"
            )
          ) || []).length === 0 ? (

            <h2>
              No Orders Yet 📭
            </h2>

          ) : (

            (JSON.parse(
              localStorage.getItem(
                "myOrders"
              )
            ) || []).map(
              (order, index) => (

                <div
                  className="order"
                  key={index}
                >

                  <h3>
                    📅 {order.date}
                  </h3>

                  <h3>
                    ⏰ {order.time}
                  </h3>

                  <h3>
                    💳 {order.payment}
                  </h3>

                  <h3>
                    💰 ₹{order.total}
                  </h3>

                  {order.items.map(
                    (item, i) => (

                      <p key={i}>
                        🍔 {item.name}
                        {" "}x{" "}
                        {item.quantity}
                      </p>

                    )
                  )}

                </div>

              )
            )

          )}

        </div>

      )}

      {screen === "admin" && (

        <div>

          <button
            onClick={adminLogout}
          >
            🚪 Admin Logout
          </button>

          <h1>
            📋 Admin Dashboard
          </h1>

          <div
            style={{
              marginBottom: "20px"
            }}
          >

            <input
              placeholder="Enter UPI ID"

              value={upiId}

              onChange={(e) =>
                setUpiId(
                  e.target.value
                )
              }
            />

            <button

              onClick={() => {

                localStorage.setItem(
                  "canteenUPI",
                  upiId
                );

                alert(
                  "✅ UPI ID Saved"
                );
              }}

            >
              Save UPI
            </button>

          </div>

          {orders.length === 0 ? (

            <h2>
              No Orders Yet 📭
            </h2>

          ) : (

            orders.map(
              (order) => (

                <div
                  className="order"
                  key={order.id}
                >

                  <h2>
                    {order.customer}
                  </h2>

                  <p>
                    📱 {order.phone}
                  </p>

                  <p>
                    💳 {order.payment}
                  </p>

                  <p>
  💰 ₹{order.total}
</p>

<h3
  style={{
    marginTop: "15px",
    color: "#ff9800"
  }}
>
  Ordered Items 🍔
</h3>

{order.items.map((item, index) => (

  <div
    key={index}
    style={{
      background:"#333",
      padding:"10px",
      marginTop:"10px",
      borderRadius:"10px"
    }}
  >

    <p>
      🍽️ {item.name}
    </p>

    <p>
      🔢 Quantity:
      {item.quantity}
    </p>

    <p>
      💰 ₹{item.price}
    </p>

  </div>

))}

<button
  onClick={() =>
    completeOrder(
      order.id
    )
  }
>
  ✅ Order Prepared
</button>

                </div>

              )
            )

          )}

        </div>

      )}

    </div>
  );
}