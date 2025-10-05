import prisma from "../models/prismaGeneratedModel.js";


export const createEmployee = async (req, res) => {
  const { name, email, position, phone, department } = req.body;
  if (!name || !email || !position || !phone || !department) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  try {
    const employee = await prisma.employee.create({
      data: { name, email, position, phone, department },
    });

    res.status(200).json({
      success: true,
      employee,
      message: "Employee created successfully",
    });
  } catch (error) {
    console.error("Internal Server: Creating Employee Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create employee",
      error: error.message,
    });
  }
};


export const getAllEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json({
      success: true,
      employees,
      message: "Employees fetched successfully",
    });
  } catch (error) {
    console.error("Internal Server: Fetching Employees Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
      error: error.message,
    });
  }
};


export const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Employee ID is required",
    });
  }

  try {
    const employee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: `Employee with ID ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      employee,
      message: "Employee fetched successfully",
    });
  } catch (error) {
    console.error("Internal Server: Fetching Employee by ID Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employee",
      error: error.message,
    });
  }
};


export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, position, phone, department } = req.body;

  if (!name && !email && !position && !phone && !department) {
    return res.status(400).json({
      success: false,
      message: "At least one field is required to update!",
    });
  }

  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(id) },
      data: { name, email, position, phone, department },
    });

    res.status(200).json({
      success: true,
      employee: updatedEmployee,
      message: "Employee updated successfully",
    });
  } catch (error) {
    console.error("Internal Server: Updating Employee Error:", error);
    res.status(404).json({
      success: false,
      message: "Employee not found or update failed",
      error: error.message,
    });
  }
};


export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await prisma.employee.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      employee: deleted,
    });
  } catch (error) {
    console.error("Internal Server: Deleting Employee Error:", error);
    res.status(404).json({
      success: false,
      message: "Employee not found or deletion failed",
      error: error.message,
    });
  }
};
