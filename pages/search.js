import React, {useState, useEffect} from "react";
import styles from "../styles/search.module.css"
import Nav from "@/components/Nav/Nav";
import axios from "axios";
import Bottom from "../components/BottomNAV/Bottom"

function Search() {
    const [searchText, setSearchText] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [resdata, setResData] = useState([]);
    const [datas, setDatas] = useState([]);
    const [allData, setAllData] = useState([]);

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
        const filteredData = allData.filter((item) =>
            item.engSubCate?.toLowerCase().includes(searchText.toLowerCase()) ?? item.engCate.toLowerCase().includes(searchText.toLowerCase())
        )
        setFilteredResults(filteredData);
    }

    useEffect(() => {
        axios
            .get(process.env.NEXT_PUBLIC_API_BASE_URL + "/GetSubCategory")
            .then(async (response) => {
                const refre = await response.data.data.map((item, index) => {
                    return {engCate: item.Category.EngCategory, gujCategory: item.Category.GujCategory}
                });
                setDatas(refre);
                const refres = await Promise.all(response.data.data.map(async (item, index) => {
                    const subCategories = await Promise.all(item.SubCategory.map(async (ite, index) => {
                        return {
                            engCate: item.Category.EngCategory,
                            gujCategory: item.Category.GujCategory,
                            engSubCate: ite.EngSubCategory,
                            gujSubCategory: ite.GujSubCategory
                        };
                    }));
                    return subCategories;
                }));

                const result = refres.reduce((acc, curr) => {
                    return [...acc, ...curr];
                }, []);
                setResData(result)
                setFilteredResults([...refre, ...result])
                setAllData([...refre, ...result]);
            })
    }, [searchText == ""]);
    const dataSend = async (e) => {
        window.location.href = `/category/${e.engSubCate ? e.engSubCate : e.engCate}`;
    }

    return (
        <>
            <Nav/>
            <div className={styles.MHSf9671}>
                <div className={styles.JAS81}>
                    <input
                        className={styles.vbgae12}
                        type="text"
                        placeholder="Search by subject, city or state"
                        value={searchText}
                        onChange={handleInputChange}
                    />
                    <div className={styles.Serchitems091}>
                        {filteredResults.map((item, index) => (
                            <p className={styles.Ngah61} key={index} onClick={(e) => {
                                dataSend(item);
                            }}>
                                {item.gujSubCategory ? item.gujSubCategory : item.gujCategory}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <Bottom/>
        </>
    );
}

export default Search;
