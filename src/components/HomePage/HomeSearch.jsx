import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { useYosContext } from '../../context/Context';
import '../Style/HomeSearch.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';

function HomeSearch() {
  const { cities, universities, departments } = useYosContext();
  const navigate = useNavigate();

  const [selectedCities, setSelectedCities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);

  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCityIds = selectedCities?.map((option) => option.value);
    const selectedUniversityIds = selectedUniversities?.map((option) => option.value);
    const selectedDepartmentIds = selectedDepartments?.map((option) => option.value);

    navigate('/departmants',{
      state: {
        selectedCityIds,
        selectedUniversityIds,
        selectedDepartmentIds,
      },
    });
  };

  const handleCityChange = (selectedOptions) => {
    setSelectedCities(selectedOptions);
    const selectedCityIds = selectedOptions?.map((option) => option.value);
    const filteredUnis = universities.filter((university) => selectedCityIds.includes(university.city));
    setFilteredUniversities(filteredUnis);
  };

  const handleUniversityChange = (selectedOptions) => {
    setSelectedUniversities(selectedOptions);
    const selectedUniversityIds = selectedOptions?.map((option) => option.value.en);
    const filteredDeps = departments.filter((department) => selectedUniversityIds.includes(department.university));
    setFilteredDepartments(filteredDeps);
  };

  const handleDepartmentChange = (selectedOptions) => {
    setSelectedDepartments(selectedOptions);
  };

  return (
    <div
    className="main bg-image text-center p-3 shadow-1-strong"
    style={{
      backgroundImage:
        "url(https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      minHeight: "100vh",
    }}
  >
      <h1 className="title text-white m-5 text-center">Education</h1>
      <Form className="mySelect row p-2 bg-body rounded-3 text-start align-items-center d-inline-flex shadow">
        <div className="select col-md-12 g-2 col-lg-3 my-2">
          <Select
            placeholder="Select City"
            onChange={handleCityChange}
            options={cities?.map((city) => ({
              value: city.id,
              label: city.en,
              key: city.id,
            }))}
            isMulti
            value={selectedCities}
          />
        </div>
        <div className="select col-md-12 g-2 col-lg-3 my-2">
          <Select
            placeholder="Select University"
            onChange={handleUniversityChange}
            options={filteredUniversities?.map((university) => ({
              value: university.id,
              label: university.en,
              key: university.id,
            }))}
            isMulti
            value={selectedUniversities}
          />
        </div>
        <div className="select col-md-12 g-2 col-lg-3 my-2">
          <Select
            placeholder="Select Department"
            className="w-sm-100 w-lg-25"
            options={filteredDepartments?.map((department) => ({
              value: department.id,
              label: department.en,
              key: department.id,
            }))}
            isMulti
            value={selectedDepartments}
            onChange={handleDepartmentChange}
          />
        </div>
        <Button variant="primary" type="submit" className="button col-md-12 g-2 p-3 col-lg-3 my-2" onClick={handleSubmit}>
          Search
        </Button>
      </Form>
    </div>
  );
}

export default HomeSearch;
