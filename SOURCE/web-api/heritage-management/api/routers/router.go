package routers

import (
	"heritage-management/api/config"
	"heritage-management/api/controllers"

	"github.com/gin-gonic/gin"
)

// SetupRouter thiết lập router cho web server
func SetupRouter() *gin.Engine {
	r := gin.Default()

	// Thêm CORS middleware
	r.Use(config.AddCorsHeaders())

	// Routes
	v1 := r.Group("/api/v1")
	{
		heritage := v1.Group("/heritage")
		{
			heritage.GET("", controllers.GetPagedHeritagesWithImages)
			heritage.GET("/:id", controllers.GetHeritageByID)
			heritage.POST("", controllers.CreateHeritage)
			heritage.PUT("/:id", controllers.UpdateHeritage)
			heritage.DELETE("/:id", controllers.DeleteHeritage)
			heritage.GET("/random", controllers.GetRandomHeritages)
			heritage.GET(":id/paragraphs", controllers.GetHeritageParagraphsByHeritageID)
			heritage.GET(":id/images", controllers.GetAllImagesByHeritageID)
			heritage.POST("/full-info", controllers.CreateHeritageAndParagraphs)
			heritage.GET("/full-info/:urlSlug", controllers.GetHeritageWithParagraphsBySlug)
			heritage.GET("/related/:urlSlug", controllers.GetRelatedHeritagesWithImages)
			heritage.GET("/increase-view-count/:urlSlug", controllers.IncreaseViewCount)
		}
		heritage_paragraph := v1.Group("/heritage-paragraph")
		{
			heritage_paragraph.GET("", controllers.GetAllHeritageParagraphs)
			heritage_paragraph.GET("/:id", controllers.GetHeritageParagraphByID)
			heritage_paragraph.POST("", controllers.CreateHeritageParagraph)
			heritage_paragraph.PUT("/:id", controllers.UpdateHeritageParagraph)
			heritage_paragraph.DELETE("/:id", controllers.DeleteHeritageParagraph)
		}
		heritage_type := v1.Group("/heritage-type")
		{
			heritage_type.GET("", controllers.GetPagedHeritageTypes)
			heritage_type.GET("/:id", controllers.GetHeritageTypeByID)
			heritage_type.POST("", controllers.CreateHeritageType)
			heritage_type.PUT("/:id", controllers.UpdateHeritageType)
			heritage_type.DELETE("/:id", controllers.DeleteHeritageType)
			heritage_type.GET("/slug/:urlSlug/heritages", controllers.GetHeritageByTypeSlug)
			heritage_type.GET("/slug/:urlSlug", controllers.GetHeritageTypeBySlug)
			heritage_type.GET("/slug/:urlSlug/heritages/paged", controllers.GetPagedHeritageByTypeSlug)
		}
		management_unit := v1.Group("/management-unit")
		{
			management_unit.GET("", controllers.GetPagedManagementUnits)
			management_unit.GET("/:id", controllers.GetManagementUnitByID)
			management_unit.POST("", controllers.CreateManagementUnit)
			management_unit.PUT("/:id", controllers.UpdateManagementUnit)
			management_unit.DELETE("/:id", controllers.DeleteManagementUnit)
			management_unit.GET("/slug/:urlSlug/heritages", controllers.GetHeritageByUnitSlug)
			management_unit.GET("/slug/:urlSlug", controllers.GetManagementUnitBySlug)
			management_unit.GET("/slug/:urlSlug/heritages/paged", controllers.GetPagedHeritageByUnitSlug)
		}
		location := v1.Group("/location")
		{
			location.GET("", controllers.GetPagedLocations)
			location.GET("/:id", controllers.GetLocationByID)
			location.POST("", controllers.CreateLocation)
			location.PUT("/:id", controllers.UpdateLocation)
			location.DELETE("/:id", controllers.DeleteLocation)
			location.GET("/slug/:urlSlug/heritages", controllers.GetHeritageByLocationSlug)
			location.GET("/slug/:urlSlug", controllers.GetLocationBySlug)
			location.GET("/slug/:urlSlug/heritages/paged", controllers.GetPagedHeritageByLocationSlug)
		}
		user := v1.Group("/user")
		{
			user.GET("", controllers.GetPagedUsers)
			user.GET("/:id", controllers.GetUserByID)
			user.POST("", controllers.RegisterUser)
			user.PUT("/:id", controllers.UpdateUser)
			user.DELETE("/:id", controllers.DeleteUser)
		}
		heritage_category := v1.Group("/heritage-category")
		{
			heritage_category.GET("", controllers.GetPagedHeritageCategories)
			heritage_category.GET("/:id", controllers.GetHeritageCategoryByID)
			heritage_category.POST("", controllers.CreateHeritageCategory)
			heritage_category.PUT("/:id", controllers.UpdateHeritageCategory)
			heritage_category.DELETE("/:id", controllers.DeleteHeritageCategory)
			heritage_category.GET("/slug/:urlSlug/heritages", controllers.GetHeritageByCategorySlug)
			heritage_category.GET("/slug/:urlSlug", controllers.GetHeritageCategoryBySlug)
			heritage_category.GET("/slug/:urlSlug/heritages/paged", controllers.GetPagedHeritageByCategorySlug)
		}
	}

	return r
}
