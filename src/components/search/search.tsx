import { GEO_API_URL } from "../../api";
import { useFormik } from "formik";
import { initialValues } from "../../utilities";
import { inputSchema } from "../../schema";
import { toast } from "react-toastify";
import { SearchProps, FormValues } from "../../interface/types";
import "./search.css";

const Search = ({ onSearchChange, setLoading, loading, setError }: SearchProps) => {
  const { errors, values, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    validationSchema: inputSchema,
    onSubmit: handleFormSubmit,
    initialValues,
  });

  function handleFormSubmit(values: FormValues) {
    setLoading(true);
    const trimiedValues = {} as FormValues;

    for (let key in values) {
      trimiedValues[key as keyof FormValues] = values[key as keyof FormValues].toString().trim();
    }
    const { addressType, streetNumber, state, city, street, zip, benchmark } = trimiedValues;

    const url = `${GEO_API_URL}/${addressType}=${streetNumber}+${street
      .split(" ")
      .join("+")}&city=%20${city}&state=${state}&zip=${zip}&benchmark=Public_AR_${benchmark}&format=json`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          console.log("error", response);
          toast(response.errors.join("\n\r"));
          setError(response.errors);
        } else if (!response.result.addressMatches.length) {
          setError("Invalid Address plese check fields");
          toast("Invalid Address plese check fields");
        } else {
          const result = response.result.addressMatches.map((city: any) => {
            return {
              value: `${city.coordinates.x} ${city.coordinates.y}`,
              label: city.matchedAddress,
            };
          });
          console.log(result[0]);
          onSearchChange(result[0]);
          setError("");
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-input">
        <label>Address Type</label>
        <select
          name="addressType"
          value={values.addressType}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ border: errors.addressType && touched.addressType ? "1px solid #ff0000" : "" }}
        >
          <option value="onelineaddress?address" defaultChecked>
            One line Address
          </option>
          <option value="address?street">Address</option>
        </select>
        {errors.addressType && touched.addressType && <span className="error">{errors.addressType}</span>}
      </div>
      <div className="form-input">
        <label>Street Number</label>
        <input
          type="Number"
          placeholder="street number..."
          name="streetNumber"
          value={values.streetNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ border: errors.streetNumber && touched.streetNumber ? "1px solid #ff0000" : "" }}
        />
        {errors.streetNumber && touched.streetNumber && <span className="error">{errors.streetNumber}</span>}
      </div>
      <div className="form-input">
        <label>Street</label>
        <input
          type="text"
          placeholder="street..."
          name="street"
          value={values.street}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ border: errors.street && touched.street ? "1px solid #ff0000" : "" }}
        />
        {errors.street && touched.street && <span className="error">{errors.street}</span>}
      </div>
      <div className="form-input">
        <label>City</label>
        <input type="text" placeholder="city..." name="city" value={values.city} onChange={handleChange} onBlur={handleBlur} />
      </div>
      <div className="form-input">
        <label>State</label>
        <input
          type="text"
          placeholder="state..."
          name="state"
          value={values.state}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ border: errors.state && touched.state ? "1px solid #ff0000" : "" }}
        />
        {errors.state && touched.state && <span className="error">{errors.state}</span>}
      </div>
      <div className="form-input">
        <label>Zip code</label>
        <input
          type="number"
          placeholder="zip..."
          name="zip"
          value={values.zip}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ border: errors.zip && touched.zip ? "1px solid #ff0000" : "" }}
        />
        {errors.zip && touched.zip && <span className="error">{errors.zip}</span>}
      </div>
      <div className="form-input">
        <label>Benchmark</label>
        <select
          name="benchmark"
          value={values.benchmark}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ border: errors.benchmark && touched.benchmark ? "1px solid #ff0000" : "" }}
        >
          <option value="Current" defaultChecked>
            Current
          </option>
          <option value="ACS2022">ACS 2022</option>
          <option value="Census2020">Census 2020</option>
        </select>
        {errors.benchmark && touched.benchmark && <span className="error">{errors.benchmark}</span>}
      </div>
      <button type="submit" className="btn">
        {loading ? "Please wait..." : "See Weather"}
      </button>
    </form>
  );
};

export default Search;
