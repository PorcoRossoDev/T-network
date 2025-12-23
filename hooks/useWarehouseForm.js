import { useState, useEffect, useRef } from "react";
import { Alert } from "react-native";
import { apiGet, apiPost } from "../services/api";

export const useWarehouseForm = (id, navigation) => {
  // Ref for debouncing land certificate check
  const landCertificateTimeoutRef = useRef(null);

  // Local state for form fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: null,
    albumImages: [],
    contractImages: [],
    redBookImages: [],
    plotImage: null,
    province: "",
    provinceCode: "",
    ward: "",
    wardCode: "",
    address: "",
    propertyType: "",
    propertyTypeName: "",
    type: 1,
    typeName: "ĐC1",
    area: "",
    priceUnit: 14,
    priceUnitName: "VND",
    priceValue: "",
    commissionValue: "",
    legalStatus: 17,
    legalStatusName: "Sổ đỏ / Sổ hồng",
    landCertificateNumber: "",
    furniture: "",
    furnitureName: "",
    floors: "",
    bedrooms: "",
    bathrooms: "",
    direction: "",
    directionName: "",
    balconyDirection: "",
    balconyDirectionName: "",
    propertyStatus: 32,
    propertyStatusName: "Mới",
    propertyCriteria: [],
    propertyCriteriaNames: [],
    frontage: "",
    roadWidth: "",
    length: "",
    ownerName: "",
    ownerAddress: "",
    ownerPhone: "",
    ownerIdNumber: "",
    status: "Mới",
  });

  // Other local states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [filteredModalData, setFilteredModalData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceSuggestions, setPriceSuggestions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState(
    formData.provinceCode || null
  );
  const [lists, setLists] = useState({
    property_type: [],
    price_unit: [],
    legal_status: [],
    furniture_option: [],
    direction: [],
    property_status: [],
    property_criteria_option: [],
    commission_unit: [],
  });
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);

  // Land certificate checking states
  const [landCertificateExists, setLandCertificateExists] = useState(false);
  const [landCertificateCheckLoading, setLandCertificateCheckLoading] =
    useState(false);

  // Commission percentage warning state
  const [percentageWarning, setPercentageWarning] = useState(false);

  // Data types constant
  const dataTypes = [
    { id: 1, name: "ĐC1" },
    { id: 2, name: "ĐC2" },
  ];

  // Check land certificate function
  const checkLandCertificate = async (certificateNumber) => {
    if (!certificateNumber || certificateNumber.trim() === "") {
      setLandCertificateExists(false);
      return;
    }

    try {
      setLandCertificateCheckLoading(true);

      // Build query parameters
      let url = `/estate/check-land-certificate/${certificateNumber}`;

      // If editing, exclude current estate from check
      if (id) {
        url += `?exclude_id=${id}`;
      }

      const response = await apiGet(url);
      // Show warning when there is at least 1 estate with the same certificate number
      setLandCertificateExists(response.data.count >= 1);
    } catch (error) {
      setLandCertificateExists(false);
    } finally {
      setLandCertificateCheckLoading(false);
    }
  };

  // Debounced land certificate checking
  useEffect(() => {
    if (landCertificateTimeoutRef.current) {
      clearTimeout(landCertificateTimeoutRef.current);
    }

    landCertificateTimeoutRef.current = setTimeout(() => {
      checkLandCertificate(formData.landCertificateNumber);
    }, 500); // 500ms debounce

    return () => {
      if (landCertificateTimeoutRef.current) {
        clearTimeout(landCertificateTimeoutRef.current);
      }
    };
  }, [formData.landCertificateNumber, id]);

  // Fetch estate data for update mode
  useEffect(() => {
    if (id) {
      const fetchEstateData = async () => {
        try {
          setLoading(true);
          const { data } = await apiGet(`/estate/show-edit/${id}`);
          const estate = data;

          // Format VND values when loading existing data
          const formattedPriceValue = isVNDUnit(estate.price_unit_name)
            ? formatVNDNumber(estate.price || "")
            : estate.price || "";

          let formattedCommissionValue = estate.commission || "";

          setFormData({
            title: estate.title || "",
            description: estate.description || "",
            coverImage: estate.image || null,
            albumImages: estate.albums || [],
            contractImages: estate.contract_images || [],
            redBookImages: estate.red_book_images || [],
            plotImage: estate.plot_image || null,
            province: estate.province || "",
            provinceCode: estate.province_code || "",
            ward: estate.ward || "",
            wardCode: estate.ward_code || "",
            address: estate.address || "",
            propertyType: estate.property_type || "",
            propertyTypeName: estate.property_type_name || "",
            type: estate.type || "",
            typeName: estate.type == 1 ? "ĐC1" : "ĐC2",
            area: estate.area || "",
            priceUnit: estate.price_unit || "",
            priceUnitName: estate.price_unit_name || "",
            priceValue: formattedPriceValue,
            commissionValue: formattedCommissionValue,
            legalStatus: estate.legal_status || "",
            legalStatusName: estate.legal_status_name || "",
            landCertificateNumber: estate.land_certificate_number || "",
            furniture: estate.furniture || "",
            furnitureName: estate.furniture_name || "",
            floors: estate.floors || 0,
            bedrooms: estate.bedrooms || 0,
            bathrooms: estate.bathrooms || 0,
            direction: estate.direction || "",
            directionName: estate.direction_name || "",
            balconyDirection: estate.balcony_direction || "",
            balconyDirectionName: estate.balcony_direction_name || "",
            propertyStatus: estate.property_status || "",
            propertyStatusName: estate.property_status_name || "",
            propertyCriteria: estate.property_criteria || [],
            propertyCriteriaNames: estate.property_criteria_names || [],
            frontage: estate.frontage || "",
            roadWidth: estate.road_width || "",
            length: estate.length || "",
            ownerName: estate.owner_name || "",
            ownerAddress: estate.owner_address || "",
            ownerPhone: estate.owner_phone || "",
            ownerIdNumber: estate.owner_id_number || "",
            status: estate.status || "Mới",
            publish: estate.publish || 0,
          });

          // Set selectedProvinceCode to trigger ward fetching
          setSelectedProvinceCode(estate.province_code || null);
          setLoading(false);
        } catch (error) {
          console.log(error.message);
          Alert.alert(
            "Thông báo",
            error.message || "Không thể tải dữ liệu bất động sản."
          );
          navigation.goBack();
        }
      };
      fetchEstateData();
    } else {
      setLoading(false);
    }
  }, [id, navigation]);

  // Fetch category lists
  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        const response = await apiGet("/category-items/all");
        setLists(response.data);
      } catch (error) {
        Alert.alert("Thông báo", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  // Fetch provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await apiGet(`/provinces`);
        const sortedProvinces = response.data.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA === "thành phố hà nội") return -1;
          if (nameB === "thành phố hà nội") return 1;
          if (nameA === "thành phố hồ chí minh") return -1;
          if (nameB === "thành phố hồ chí minh") return 1;
          return nameA.localeCompare(nameB, "vi");
        });
        setProvinces(sortedProvinces);
      } catch (error) {
        console.log("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  // Fetch wards
  useEffect(() => {
    if (selectedProvinceCode) {
      const fetchWards = async () => {
        try {
          const response = await apiGet(`/wards/${selectedProvinceCode}`);
          setWards(response.data || []);
        } catch (error) {
          console.log("Error fetching wards:", error);
        }
      };

      fetchWards();
      // Only reset ward if it doesn't match the selected province
      if (formData.provinceCode !== selectedProvinceCode) {
        setFormData((prev) => ({
          ...prev,
          ward: "",
          wardCode: "",
        }));
      }
    }
  }, [selectedProvinceCode, formData.provinceCode]);

  // Filter modal data
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredModalData(modalData);
    } else {
      const filtered = modalData.filter((item) =>
        (item.name || item)
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase())
      );
      setFilteredModalData(filtered);
    }
  }, [searchQuery, modalData]);

  // Utility functions
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const formatVNDNumber = (value) => {
    if (!value) return "";
    // Remove all non-numeric characters except dots
    const cleanValue = value.replace(/[^\d]/g, "");
    // Add dots every 3 digits
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const unformatVNDNumber = (value) => {
    if (!value) return "";
    return value.replace(/\./g, "");
  };

  const isVNDUnit = (unitName) => {
    if (!unitName) return false;
    const unitLower = unitName.toLowerCase();
    return (
      unitName === "VND" ||
      unitLower === "vnd" ||
      unitLower.includes("vnd") ||
      unitLower.includes("giá/m2") ||
      unitLower.includes("giá/m²") ||
      unitLower.includes("đồng/m2") ||
      unitLower.includes("đồng/m²")
    );
  };

  const isPercentageUnit = (unitName) => {
    if (!unitName) return false;
    const unitLower = unitName.toLowerCase();
    return (
      unitName === "%" ||
      unitLower === "phần trăm" ||
      unitLower === "percent" ||
      unitLower === "percentage" ||
      unitLower.includes("%")
    );
  };

  const generatePriceSuggestions = (input) => {
    const cleanedInput = input.replace(/\./g, "");
    if (!cleanedInput || isNaN(cleanedInput) || cleanedInput === "0") {
      setPriceSuggestions([]);
      return;
    }

    const numValue = parseInt(cleanedInput);
    const numDigits = cleanedInput.length;

    if (numDigits >= 10) {
      setPriceSuggestions([]);
      return;
    }

    const suggestions = [];

    if (numDigits <= 3) {
      const million1 = numValue * Math.pow(10, 6 - numDigits);
      const million2 = numValue * Math.pow(10, 7 - numDigits);
      const billion1 = numValue * Math.pow(10, 8 - numDigits);
      const billion2 = numValue * Math.pow(10, 9 - numDigits);
      const billion3 = numValue * Math.pow(10, 10 - numDigits);

      suggestions.push(
        {
          value: million1,
          display: `${formatNumberWithCommas(numValue)} triệu`,
        },
        {
          value: million2,
          display: `${formatNumberWithCommas(numValue * 10)} triệu`,
        },
        {
          value: billion1,
          display: `${(numValue / 10).toFixed(1).replace(/\.?0+$/, "")} tỷ`,
        },
        { value: billion2, display: `${formatNumberWithCommas(numValue)} tỷ` },
        {
          value: billion3,
          display: `${formatNumberWithCommas(numValue * 10)} tỷ`,
        }
      );
    } else if (numDigits <= 7) {
      const million1 = numValue * Math.pow(10, 7 - numDigits);
      const million2 = numValue * Math.pow(10, 8 - numDigits);
      const billion1 = numValue * Math.pow(10, 9 - numDigits);
      const billion2 = numValue * Math.pow(10, 10 - numDigits);
      const billion3 = numValue * Math.pow(10, 11 - numDigits);

      suggestions.push(
        {
          value: million1,
          display: `${formatNumberWithCommas(million1 / 1000000)} triệu`,
        },
        {
          value: million2,
          display: `${formatNumberWithCommas(million2 / 1000000)} triệu`,
        },
        {
          value: billion1,
          display: `${(billion1 / 1000000000)
            .toFixed(3)
            .replace(/\.?0+$/, "")} tỷ`,
        },
        {
          value: billion2,
          display: `${(billion2 / 1000000000)
            .toFixed(2)
            .replace(/\.?0+$/, "")} tỷ`,
        },
        {
          value: billion3,
          display: `${(billion3 / 1000000000)
            .toFixed(1)
            .replace(/\.?0+$/, "")} tỷ`,
        }
      );
    } else if (numDigits === 8) {
      const million2 = numValue * Math.pow(10, 8 - numDigits);
      const billion1 = numValue * Math.pow(10, 9 - numDigits);
      const billion2 = numValue * Math.pow(10, 10 - numDigits);
      const billion3 = numValue * Math.pow(10, 11 - numDigits);

      suggestions.push(
        {
          value: million2,
          display: `${formatNumberWithCommas(million2 / 1000000)} triệu`,
        },
        {
          value: billion1,
          display: `${(billion1 / 1000000000)
            .toFixed(3)
            .replace(/\.?0+$/, "")} tỷ`,
        },
        {
          value: billion2,
          display: `${(billion2 / 1000000000)
            .toFixed(2)
            .replace(/\.?0+$/, "")} tỷ`,
        },
        {
          value: billion3,
          display: `${(billion3 / 1000000000)
            .toFixed(1)
            .replace(/\.?0+$/, "")} tỷ`,
        }
      );
    } else if (numDigits === 9) {
      const billion2 = numValue * Math.pow(10, 10 - numDigits);
      const billion3 = numValue * Math.pow(10, 11 - numDigits);
      const billion4 = numValue * Math.pow(10, 12 - numDigits);

      suggestions.push(
        {
          value: billion2,
          display: `${(billion2 / 1000000000)
            .toFixed(3)
            .replace(/\.?0+$/, "")} tỷ`,
        },
        {
          value: billion3,
          display: `${(billion3 / 1000000000)
            .toFixed(2)
            .replace(/\.?0+$/, "")} tỷ`,
        },
        {
          value: billion4,
          display: `${(billion4 / 1000000000)
            .toFixed(1)
            .replace(/\.?0+$/, "")} tỷ`,
        }
      );
    }

    setPriceSuggestions(suggestions);
  };

  const handlePriceInputChange = (text) => {
    let formattedText = text;

    // Format VND with dots if unit is VND
    if (isVNDUnit(formData.priceUnitName)) {
      formattedText = formatVNDNumber(text);
    }

    setFormData((prev) => ({ ...prev, priceValue: formattedText }));
    generatePriceSuggestions(unformatVNDNumber(text));
  };

  const formatLargeNumber = (num) => {
    if (!num) return "0";

    // Handle VND formatted numbers (with dots) and convert to clean number
    const cleanNum =
      typeof num === "string" ? num.replace(/\./g, "") : num.toString();

    // Check if the clean number is valid
    if (isNaN(cleanNum) || cleanNum === "" || cleanNum === "0") return "0";

    const number = parseFloat(cleanNum);

    if (number >= 1000000000) {
      const billions = (number / 1000000000).toFixed(2).replace(/\.?0+$/, "");
      return `${billions.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} tỷ`;
    } else if (number >= 1000000) {
      const millions = (number / 1000000).toFixed(2).replace(/\.?0+$/, "");
      return `${millions.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} triệu`;
    } else if (number >= 1000) {
      return `${formatNumberWithCommas(number)} ngàn`;
    } else {
      return `${number} VND`;
    }
  };

  const openModal = (type, title, data) => {
    let modalData;
    switch (type) {
      case "province":
        modalData = provinces;
        break;
      case "ward":
        modalData = wards;
        break;
      case "propertyType":
        modalData = lists.property_type;
        break;
      case "type":
        modalData = dataTypes;
        break;
      case "priceUnit":
        modalData = lists.price_unit;
        break;
      case "legalStatus":
        modalData = lists.legal_status;
        break;
      case "furniture":
        modalData = lists.furniture_option;
        break;
      case "direction":
        modalData = lists.direction;
        break;
      case "balconyDirection":
        modalData = lists.direction;
        break;
      case "propertyStatus":
        modalData = lists.property_status;
        break;
      case "propertyCriteria":
        modalData = lists.property_criteria_option;
        break;
      case "commissionUnit":
        modalData = lists.commission_unit;
        break;
      default:
        modalData = data;
    }
    setModalType(type);
    setModalData(modalData);
    setFilteredModalData(modalData);
    setModalTitle(title);
    setSearchQuery("");
    setModalVisible(true);
  };

  const isItemActive = (item) => {
    switch (modalType) {
      case "province":
        return String(item.code) == String(formData.provinceCode);
      case "ward":
        return String(item.code) == String(formData.wardCode);
      case "propertyType":
        return item.id == formData.propertyType;
      case "type":
        return item.id == formData.type;
      case "priceUnit":
        return item.id == formData.priceUnit;
      case "legalStatus":
        return item.id == formData.legalStatus;
      case "furniture":
        return item.id == formData.furniture;
      case "direction":
        return item.id == formData.direction;
      case "balconyDirection":
        return item.id == formData.balconyDirection;
      case "propertyStatus":
        return item.id == formData.propertyStatus;
      case "propertyCriteria":
        return formData.propertyCriteriaNames.includes(item.name);
      case "commissionUnit":
        return item.id == formData.commissionUnit;
      default:
        return false;
    }
  };

  const handleSelect = (value) => {
    switch (modalType) {
      case "province":
        setFormData((prev) => ({
          ...prev,
          province: value.name,
          provinceCode: value.code,
          ward: "",
          wardCode: "",
        }));
        setSelectedProvinceCode(value.code);
        setModalVisible(false);
        break;
      case "ward":
        setFormData((prev) => ({
          ...prev,
          ward: value.name,
          wardCode: value.code,
        }));
        setModalVisible(false);
        break;
      case "propertyType":
        setFormData((prev) => ({
          ...prev,
          propertyType: value.id,
          propertyTypeName: value.name,
        }));
        setModalVisible(false);
        break;
      case "type":
        setFormData((prev) => ({
          ...prev,
          type: value.id,
          typeName: value.name,
        }));
        setModalVisible(false);
        break;
      case "priceUnit":
        setFormData((prev) => {
          let newPriceValue = prev.priceValue;

          // Handle price formatting when unit changes
          if (value.name === "Giá thỏa thuận") {
            newPriceValue = "0";
          } else if (prev.priceValue === "0") {
            newPriceValue = "";
          } else if (prev.priceValue) {
            // If switching from VND to non-VND, unformat
            if (isVNDUnit(prev.priceUnitName) && !isVNDUnit(value.name)) {
              newPriceValue = unformatVNDNumber(prev.priceValue);
            }
            // If switching from non-VND to VND, format
            else if (!isVNDUnit(prev.priceUnitName) && isVNDUnit(value.name)) {
              newPriceValue = formatVNDNumber(prev.priceValue);
            }
          }

          return {
            ...prev,
            priceUnit: value.id,
            priceUnitName: value.name,
            priceValue: newPriceValue,
          };
        });
        setModalVisible(false);
        break;
      case "legalStatus":
        setFormData((prev) => ({
          ...prev,
          legalStatus: value.id,
          legalStatusName: value.name,
        }));
        setModalVisible(false);
        break;
      case "furniture":
        setFormData((prev) => ({
          ...prev,
          furniture: value.id,
          furnitureName: value.name,
        }));
        setModalVisible(false);
        break;
      case "direction":
        setFormData((prev) => ({
          ...prev,
          direction: value.id,
          directionName: value.name,
        }));
        setModalVisible(false);
        break;
      case "balconyDirection":
        setFormData((prev) => ({
          ...prev,
          balconyDirection: value.id,
          balconyDirectionName: value.name,
        }));
        setModalVisible(false);
        break;
      case "propertyStatus":
        setFormData((prev) => ({
          ...prev,
          propertyStatus: value.id,
          propertyStatusName: value.name,
        }));
        setModalVisible(false);
        break;
      case "propertyCriteria":
        const newCriteriaNames = formData.propertyCriteriaNames.includes(
          value.name
        )
          ? formData.propertyCriteriaNames.filter((item) => item !== value.name)
          : [...formData.propertyCriteriaNames, value.name];
        const newCriteria = newCriteriaNames.map(
          (name) =>
            lists.property_criteria_option.find((opt) => opt.name === name)
              ?.id || ""
        );
        setFormData((prev) => ({
          ...prev,
          propertyCriteria: newCriteria,
          propertyCriteriaNames: newCriteriaNames,
        }));
        break;
      case "commissionUnit":
        setFormData((prev) => {
          let newCommissionValue = prev.commissionValue;

          // Handle commission formatting when unit changes
          if (prev.commissionValue) {
            // If switching from VND to non-VND, unformat
            if (isVNDUnit(prev.commissionUnitName) && !isVNDUnit(value.name)) {
              newCommissionValue = unformatVNDNumber(prev.commissionValue);
            }
            // If switching from non-VND to VND, format
            else if (
              !isVNDUnit(prev.commissionUnitName) &&
              isVNDUnit(value.name)
            ) {
              newCommissionValue = formatVNDNumber(prev.commissionValue);
            }
          }

          // Validate percentage when switching to % unit
          if (isPercentageUnit(value.name) && newCommissionValue) {
            const numValue = parseFloat(newCommissionValue.replace(/\./g, ""));
            if (!isNaN(numValue)) {
              if (numValue > 100) {
                newCommissionValue = "100";
                setPercentageWarning(true);
                setTimeout(() => setPercentageWarning(false), 3000);
              } else if (numValue < 0) {
                newCommissionValue = "0";
                setPercentageWarning(false);
              } else {
                setPercentageWarning(false);
              }
            } else {
              setPercentageWarning(false);
            }
          } else {
            setPercentageWarning(false);
          }

          return {
            ...prev,
            commissionUnit: value.id,
            commissionUnitName: value.name,
            commissionValue: newCommissionValue,
          };
        });
        setModalVisible(false);
        break;
      default:
        break;
    }
  };

  return {
    formData,
    setFormData,
    modalVisible,
    setModalVisible,
    modalType,
    modalData,
    modalTitle,
    filteredModalData,
    searchQuery,
    setSearchQuery,
    priceSuggestions,
    provinces,
    wards,
    selectedProvinceCode,
    setSelectedProvinceCode,
    lists,
    loading,
    formLoading,
    setFormLoading,
    error,
    landCertificateExists,
    landCertificateCheckLoading,
    percentageWarning,
    dataTypes,
    openModal,
    handleSelect,
    isItemActive,
    handlePriceInputChange,
    formatLargeNumber,
    unformatVNDNumber,
    isVNDUnit,
    isPercentageUnit,
    formatVNDNumber,
    formatNumberWithCommas,
  };
};
