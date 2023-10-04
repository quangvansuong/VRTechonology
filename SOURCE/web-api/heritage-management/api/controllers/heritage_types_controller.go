package controllers

import (
	"heritage-management/api/db"
	"heritage-management/api/models"
	"heritage-management/api/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetPagedHeritageTypes trả về danh sách tất cả loại di sản văn hóa với phân trang
func GetPagedHeritageTypes(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	columnName := c.DefaultQuery("columnName", "id")
	sortOrder := c.DefaultQuery("sortOrder", "desc")

	var total int64
	var types []models.Heritage_Type

	// Đếm tổng số lượng
	if err := db.GetDB().Model(&models.Heritage_Type{}).Count(&total).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	// Đếm tổng số trang
	// Chia % vì nếu chia có dư thì đồng nghĩa vẫn còn trang sau nên phải tăng thêm 1
	totalPages := int(total) / limit
	if int(total)%limit != 0 {
		totalPages++
	}

	// Phân trang
	offset := (page - 1) * limit
	orderClause := columnName + " " + sortOrder
	if err := db.GetDB().Order(orderClause).Offset(offset).Limit(limit).Find(&types).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	// Tạo đối tượng phản hồi phân trang
	pagination := utils.Pagination{
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
		Data:       types,
	}

	utils.SuccessResponse(c, http.StatusOK, pagination)
}

// GetHeritageTypeByID trả về thông tin về một loại di sản văn hóa dựa trên ID
func GetHeritageTypeByID(c *gin.Context) {
	id := c.Param("id")

	var hType models.Heritage_Type

	// Lấy thông tin về loại di sản văn hóa dựa trên ID từ cơ sở dữ liệu
	if err := db.GetDB().Where("id = ?", id).First(&hType).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage type not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, hType)
}

// CreateHeritageType tạo một loại di sản văn hóa mới
func CreateHeritageType(c *gin.Context) {
	var hType models.Heritage_Type

	// Parse thông tin về loại di sản văn hóa từ request body
	if err := c.ShouldBindJSON(&hType); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	// Thêm loại di sản văn hóa vào cơ sở dữ liệu
	if err := db.GetDB().Create(&hType).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create heritage type")
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, hType)
}

// UpdateHeritageType cập nhật thông tin về một loại di sản văn hóa dựa trên ID
func UpdateHeritageType(c *gin.Context) {
	id := c.Param("id")

	var hType models.Heritage_Type

	// Lấy thông tin về loại di sản văn hóa dựa trên ID từ cơ sở dữ liệu
	if err := db.GetDB().Where("id = ?", id).First(&hType).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage type not found")
		return
	}

	// Parse thông tin cập nhật từ request body
	if err := c.ShouldBindJSON(&hType); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	// Lưu thông tin cập nhật vào cơ sở dữ liệu
	if err := db.GetDB().Save(&hType).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not save heritage type")
		return
	}
	utils.SuccessResponse(c, http.StatusOK, "Heritage type updated successfully")
}

// DeleteHeritage xóa một loại di sản văn hóa dựa trên ID
func DeleteHeritageType(c *gin.Context) {
	id := c.Param("id")

	var hType models.Heritage_Type

	// Lấy thông tin về loại di sản văn hóa dựa trên ID từ cơ sở dữ liệu
	if err := db.GetDB().Where("id = ?", id).First(&hType).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage type not found")
		return
	}

	// Xóa loại di sản văn hóa khỏi cơ sở dữ liệu
	if err := db.GetDB().Delete(&hType).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not delete heritage type")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, gin.H{"message": "Heritage type deleted successfully"})
}

// GetHeritageByTypeSlug trả về danh sách di sản văn hóa dựa trên URL slug của thể loại
func GetHeritageByTypeSlug(c *gin.Context) {
	typeSlug := c.Param("urlSlug")

	var heritage_type models.Heritage_Type
	if err := db.GetDB().Where("urlslug = ?", typeSlug).First(&heritage_type).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage Type not found")
		return
	}

	var heritage []models.Heritage
	if err := db.GetDB().Where("heritage_type_id = ?", heritage_type.ID).Find(&heritage).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, heritage)
}

// GetPagedHeritageByTypeSlug trả về danh sách di sản văn hóa dựa trên URL slug của thể loại có phân trang
func GetPagedHeritageByTypeSlug(c *gin.Context) {
	typeSlug := c.Param("urlSlug")
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	columnName := c.DefaultQuery("columnName", "id")
	sortOrder := c.DefaultQuery("sortOrder", "desc")

	// Lấy thông tin của thể loại dựa trên URL slug
	var heritage_type models.Heritage_Type
	if err := db.GetDB().Where("urlslug = ?", typeSlug).First(&heritage_type).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage Type not found")
		return
	}

	// Tìm tổng số lượng di sản văn hóa dựa trên ID của thể loại
	var total int64
	if err := db.GetDB().Model(&models.Heritage{}).Where("heritage_type_id = ?", heritage_type.ID).Count(&total).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get heritage")
		return
	}

	// Tính toán số trang, offset và loại sắp xếp
	totalPages := int(total) / limit
	if int(total)%limit != 0 {
		totalPages++
	}
	offset := (page - 1) * limit
	orderClause := columnName + " " + sortOrder

	// Truy vấn di sản văn hóa dựa trên ID của địa điểm và phân trang
	var heritages []models.Heritage
	if err := db.GetDB().Order(orderClause).Where("heritage_type_id = ?", heritage_type.ID).Offset(offset).Limit(limit).Preload("HeritageType").Preload("HeritageCategory").Preload("Location").Preload("ManagementUnit").Find(&heritages).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get heritage")
		return
	}

	// Kiểm tra dữ liệu trả về rỗng
	if len(heritages) == 0 {
		utils.ErrorResponse(c, http.StatusNotFound, "No heritage available")
		return
	}

	// Lấy danh sách hình ảnh cho mỗi di sản
	for i := range heritages {
		var heritageParagraphs []models.Heritage_Paragraph

		if err := db.GetDB().Where("heritage_id = ?", heritages[i].ID).Find(&heritageParagraphs).Error; err != nil {
			utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get heritage paragraphs")
			return
		}

		images := make([]string, 0)

		for _, paragraph := range heritageParagraphs {
			images = append(images, paragraph.ImageURL)
		}

		// Gán danh sách hình ảnh vào thuộc tính Images của di sản tương ứng
		heritages[i].Images = images
	}

	// Tạo đối tượng phản hồi phân trang
	pagination := utils.Pagination{
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
		Data:       heritages,
	}

	utils.SuccessResponse(c, http.StatusOK, pagination)
}

// GetLocationBySlug trả về thông tin của một địa điểm dựa trên slug
func GetHeritageTypeBySlug(c *gin.Context) {
	slug := c.Param("urlSlug")

	var heritageType models.Heritage_Type

	if err := db.GetDB().Where("urlslug = ?", slug).First(&heritageType).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage Type not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, heritageType)
}
