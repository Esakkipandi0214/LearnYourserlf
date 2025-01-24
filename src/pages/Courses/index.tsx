import React from 'react'
import Layout from '@/components/LayoutComponents/Layout'
// import CourseList from '@/components/CoursesComponents/CourseList'
import SearchComponent from '@/components/common/SearchComponent'
import CourseStats from '@/components/CoursesComponents/courseStats'

const index = () => {
  return (
    <Layout>
      <div className=' px-6'><h1 className=' font-bold text-black text-xl'>My Courses</h1></div>
      <SearchComponent/>
      <CourseStats/>
    {/* <CourseList/> */}
    </Layout>
  )
}

export default index